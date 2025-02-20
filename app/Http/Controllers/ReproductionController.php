<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Reproduction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReproductionController extends Controller
{
    public function index()
    {
        // Retorna os animais do usuário e as reproduções já cadastradas
        $animals = Animal::where('user_id', Auth::id())->get();

        $reproductions = Reproduction::with([
                'egua','cavalo','doadora','receptor','animal','pai'
            ])
            ->where('user_id', Auth::id())
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Reproduction', [
            'animals' => $animals,
            'reproductions' => $reproductions
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string', // monta_natural, inseminacao, transferencia, confirmacao_prenhes
        ]);

        // Campos comuns a todos
        $data['user_id'] = Auth::id();
        $data['date'] = $request->input('date');

        switch ($data['type']) {
            case 'monta_natural':
            case 'inseminacao':
                // Campos: Nome da égua, Nome do cavalo e Data
                // Confirmamos se o user escolheu 'useEguaRegistered' e 'useCavaloRegistered'
                if ($request->input('useEguaRegistered') && $request->input('egua_id')) {
                    $data['egua_id'] = $request->input('egua_id');
                } else {
                    $data['egua_name'] = $request->input('egua_name');
                }
                if ($request->input('useCavaloRegistered') && $request->input('cavalo_id')) {
                    $data['cavalo_id'] = $request->input('cavalo_id');
                } else {
                    $data['cavalo_name'] = $request->input('cavalo_name');
                }
                break;

            case 'transferencia':
                // Campos: Nome da doadora, Nome do Cavalo, Nome do receptor, Data
                if ($request->input('useDoadoraRegistered') && $request->input('doadora_id')) {
                    $data['doadora_id'] = $request->input('doadora_id');
                } else {
                    $data['doadora_name'] = $request->input('doadora_name');
                }

                if ($request->input('useCavaloRegistered') && $request->input('cavalo_id')) {
                    $data['cavalo_id'] = $request->input('cavalo_id');
                } else {
                    $data['cavalo_name'] = $request->input('cavalo_name');
                }

                if ($request->input('useReceptorRegistered') && $request->input('receptor_id')) {
                    $data['receptor_id'] = $request->input('receptor_id');
                } else {
                    $data['receptor_name'] = $request->input('receptor_name');
                }
                break;

            case 'confirmacao_prenhes':
                // Campos: Nome do Animal, Data Provavel, Data de exame, nome do Pai
                $data['date_exame'] = $request->input('date_exame');
                $data['date_provavel'] = $request->input('date_provavel');

                if ($request->input('useAnimalRegistered') && $request->input('animal_id')) {
                    $data['animal_id'] = $request->input('animal_id');
                } else {
                    $data['animal_name'] = $request->input('animal_name');
                }

                if ($request->input('usePaiRegistered') && $request->input('pai_id')) {
                    $data['pai_id'] = $request->input('pai_id');
                } else {
                    $data['pai_name'] = $request->input('pai_name');
                }

                break;

            default:
                // Caso não seja um type esperado
                return redirect()->back()->withErrors(['type' => 'Tipo de reprodução inválido.']);
        }

        Reproduction::create($data);

        return redirect()->back()->with('success', 'Reprodução cadastrada com sucesso!');
    }
}
