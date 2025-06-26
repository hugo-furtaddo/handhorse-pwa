<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Breed;
use App\Models\Treatment;
use App\Models\Reproduction;
use App\Models\Award;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalController extends Controller
{
    // Lista os animais cadastrados pelo produtor (usuário logado)
    public function index(Request $request)
    {
        $user = $request->user();
        $animals = Animal::with('breed')
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('Animals/Index', [
            'animals' => $animals,
        ]);
    }

    // Exibe o formulário de cadastro
    public function create()
    {
        $breeds = Breed::all();
        return Inertia::render('Animals/Create', [
            'breeds' => $breeds,
        ]);
    }

    // Armazena os dados do novo animal
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'breed_id'   => 'required|exists:breeds,id',
            'sex'        => 'required|in:male,female',
            'birth_date' => 'nullable|date',
            'father'     => 'nullable|string|max:255',
            'mother'     => 'nullable|string|max:255',
            'progeny'    => 'nullable|string',
            'photos.*'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photos')) {
            $data['photos'] = collect($request->file('photos'))->map(function ($photo) {
                return $photo->store('animals', 'public');
            })->toArray();
        } else {
            $data['photos'] = [];
        }

        $data['user_id'] = $request->user()->id;

        $animal = Animal::create($data);

        return redirect()->route('animals.show', $animal);
    }

    // Exibe os detalhes de um animal específico
    public function show(Animal $animal)
    {
        $this->authorize('view', $animal); // Utilizando a Policy

        $animal->load('breed');

        $reproductionActivities = Reproduction::with('egua', 'cavalo', 'doadora', 'receptor', 'animal', 'pai')
            ->where('user_id', auth()->id())
            ->where(function ($query) use ($animal) {
                $query->where('egua_id', $animal->id)
                    ->orWhere('cavalo_id', $animal->id)
                    ->orWhere('doadora_id', $animal->id)
                    ->orWhere('receptor_id', $animal->id)
                    ->orWhere('animal_id', $animal->id)
                    ->orWhere('pai_id', $animal->id);
            })
            ->get();

        $treatments = Treatment::with('treatmentType')->where('animal_id', $animal->id)->get();
        $awards = Award::where('animal_id', $animal->id)->orderByDesc('date')->get();

        return Inertia::render('Animals/Show', [
            'animal' => $animal,
            'treatments' => $treatments,
            'reproductionActivities' => $reproductionActivities,
            'awards' => $awards,
        ]);
    }

    public function edit(Animal $animal)
    {
        $this->authorize('update', $animal); // Utilizando a Policy

        $breeds = Breed::all();

        return Inertia::render('Animals/Edit', [
            'animal' => $animal,
            'breeds' => $breeds,
        ]);
    }

    // Atualiza os dados de um animal existente
    public function update(Request $request, Animal $animal)
    {
        $this->authorize('update', $animal); // Utilizando a Policy

        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'breed_id'   => 'required|exists:breeds,id',
            'sex'        => 'required|in:male,female',
            'birth_date' => 'nullable|date',
            'father'     => 'nullable|string|max:255',
            'mother'     => 'nullable|string|max:255',
            'progeny'    => 'nullable|string',
            'photos.*'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photos')) {
            $newPhotos = collect($request->file('photos'))->map(function ($photo) {
                return $photo->store('animals', 'public');
            })->toArray();
            $data['photos'] = array_merge($animal->photos ?? [], $newPhotos);
        } else {
            $data['photos'] = $animal->photos;
        }

        $animal->update($data);

        return redirect()->route('animals.show', $animal);
    }

    public function history(Animal $animal)
    {
        $this->authorize('view', $animal);

        $animal->load('breed');

        $reproductions = Reproduction::with('egua', 'cavalo', 'doadora', 'receptor', 'animal', 'pai')
            ->where('user_id', auth()->id())
            ->where(function ($query) use ($animal) {
                $query->where('egua_id', $animal->id)
                    ->orWhere('cavalo_id', $animal->id)
                    ->orWhere('doadora_id', $animal->id)
                    ->orWhere('receptor_id', $animal->id)
                    ->orWhere('animal_id', $animal->id)
                    ->orWhere('pai_id', $animal->id);
            })
            ->get();

        $vaccines = Treatment::with('treatmentType')
            ->where('animal_id', $animal->id)
            ->whereHas('treatmentType', fn($q) => $q->where('name', 'Vacina'))
            ->get();

        $treatments = Treatment::with('treatmentType')
            ->where('animal_id', $animal->id)
            ->whereHas('treatmentType', fn($q) => $q->where('name', '!=', 'Vacina'))
            ->get();

        $awards = Award::where('animal_id', $animal->id)->orderByDesc('date')->get();

        $pdf = Pdf::loadView('pdf.animal-history', [
            'animal' => $animal,
            'treatments' => $treatments,
            'vaccines' => $vaccines,
            'reproductions' => $reproductions,
            'awards' => $awards,
        ]);

        return $pdf->download('historico-' . $animal->name . '.pdf');
    }
}
