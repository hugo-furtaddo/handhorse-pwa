<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Treatment;
use App\Models\TreatmentType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class TreatmentController extends Controller
{
    public function index()
    {
        // Retorna os tipos de tratamento, os animais do usuário e os tratamentos já cadastrados
        $treatmentTypes = TreatmentType::all();
        $animals = Animal::where('user_id', Auth::id())->get();
        $treatments = Treatment::with('treatmentType', 'animal')
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('AnimalHealth', [
            'treatmentTypes' => $treatmentTypes,
            'animals' => $animals,
            'treatments' => $treatments,
        ]);
    }

    public function store(Request $request)
    {
        // Validação comum
        $validated = $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'treatment_type_id' => 'required|exists:treatment_types,id',
            'date' => 'required|date',
        ]);

        // Identifica o tipo de tratamento
        $treatmentType = TreatmentType::findOrFail($validated['treatment_type_id']);
        $details = [];

        // Validação e processamento de campos específicos conforme o tipo
        switch ($treatmentType->name) {
            case 'Vermifugação':
                $data = $request->validate([
                    'vermifugo_photo' => 'nullable|image|max:2048',
                    'vermifugo_type' => 'required|string|max:255',
                ]);
                if ($request->hasFile('vermifugo_photo')) {
                    $path = $request->file('vermifugo_photo')->store('treatments', 'public');
                    $details['photo'] = $path;
                }
                $details['type'] = $data['vermifugo_type'];
                break;
            case 'Vacina':
                $data = $request->validate([
                    'vacina_photo' => 'nullable|image|max:2048',
                    'vacina_type' => 'required|string|max:255',
                ]);
                if ($request->hasFile('vacina_photo')) {
                    $path = $request->file('vacina_photo')->store('treatments', 'public');
                    $details['photo'] = $path;
                }
                $details['type'] = $data['vacina_type'];
                break;
            case 'Suplementação':
                $data = $request->validate([
                    'suplemento_photo' => 'nullable|image|max:2048',
                    'suplemento_type' => 'required|string|max:255',
                ]);
                if ($request->hasFile('suplemento_photo')) {
                    $path = $request->file('suplemento_photo')->store('treatments', 'public');
                    $details['photo'] = $path;
                }
                $details['type'] = $data['suplemento_type'];
                break;
            case 'Tratamento odontológico':
                $data = $request->validate([
                    'procedimento' => 'required|string',
                ]);
                $details['procedimento'] = $data['procedimento'];
                break;
            case 'Casqueamento':
                // Sem campos extras.
                break;
            default:
                break;
        }

        Treatment::create([
            'user_id' => Auth::id(),
            'animal_id' => $validated['animal_id'],
            'treatment_type_id' => $validated['treatment_type_id'],
            'date' => $validated['date'],
            'details' => $details,
        ]);

        return redirect()->back()->with('success', 'Tratamento cadastrado com sucesso.');
    }
}
