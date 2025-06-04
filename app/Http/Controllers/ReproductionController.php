<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Reproduction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReproductionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $animals = Animal::where('user_id', $user->id)->get();

        $reproductions = Reproduction::with([
                'egua', 'cavalo', 'doadora', 'receptor', 'animal', 'pai'
            ])
            ->where('user_id', $user->id)
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Reproduction', [
            'animals' => $animals,
            'reproductions' => $reproductions
        ]);
    }

    public function store(Request $request)
    {
        // Validação básica; é interessante adicionar regras específicas para cada tipo
        $rules = [
            'type' => 'required|string|in:monta_natural,inseminacao,transferencia,confirmacao_prenhes',
        ];

        // Somente alguns tipos exigem a data principal
        if ($request->input('type') !== 'confirmacao_prenhes') {
            $rules['date'] = 'required|date';
        }

        $data = $request->validate($rules);
        
        // Atribui o usuário autenticado
        $data['user_id'] = $request->user()->id;

        switch ($data['type']) {
            case 'monta_natural':
            case 'inseminacao':
                // Para a égua
                if ($request->boolean('useEguaRegistered') && $request->filled('egua_id')) {
                    $data['egua_id'] = $request->input('egua_id');
                } else {
                    $data['egua_name'] = $request->input('egua_name');
                }
                // Para o cavalo
                if ($request->boolean('useCavaloRegistered') && $request->filled('cavalo_id')) {
                    $data['cavalo_id'] = $request->input('cavalo_id');
                } else {
                    $data['cavalo_name'] = $request->input('cavalo_name');
                }
                break;

            case 'transferencia':
                // Para a doadora
                if ($request->boolean('useDoadoraRegistered') && $request->filled('doadora_id')) {
                    $data['doadora_id'] = $request->input('doadora_id');
                } else {
                    $data['doadora_name'] = $request->input('doadora_name');
                }
                // Para o cavalo
                if ($request->boolean('useCavaloRegistered') && $request->filled('cavalo_id')) {
                    $data['cavalo_id'] = $request->input('cavalo_id');
                } else {
                    $data['cavalo_name'] = $request->input('cavalo_name');
                }
                // Para o receptor
                if ($request->boolean('useReceptorRegistered') && $request->filled('receptor_id')) {
                    $data['receptor_id'] = $request->input('receptor_id');
                } else {
                    $data['receptor_name'] = $request->input('receptor_name');
                }
                break;

            case 'confirmacao_prenhes':
                $data['date_exame'] = $request->input('date_exame');
                $data['date_provavel'] = $request->input('date_provavel');

                if ($request->boolean('useAnimalRegistered') && $request->filled('animal_id')) {
                    $data['animal_id'] = $request->input('animal_id');
                } else {
                    $data['animal_name'] = $request->input('animal_name');
                }

                if ($request->boolean('usePaiRegistered') && $request->filled('pai_id')) {
                    $data['pai_id'] = $request->input('pai_id');
                } else {
                    $data['pai_name'] = $request->input('pai_name');
                }
                break;

            default:
                return redirect()->back()->withErrors(['type' => 'Tipo de reprodução inválido.']);
        }

        Reproduction::create($data);

        return redirect()->back()->with('success', 'Reprodução cadastrada com sucesso!');
    }
}
