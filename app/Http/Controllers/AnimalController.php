<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Treatment;
use App\Models\Reproduction;

class AnimalController extends Controller
{
    // Lista os animais cadastrados pelo produtor (usuário logado)
    public function index()
    {
        $animals = Animal::with('breed')
            ->where('user_id', auth()->id())
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
            'birth_date' => 'nullable|date',
            'father'     => 'nullable|string|max:255',
            'mother'     => 'nullable|string|max:255',
            'progeny'    => 'nullable|string',
            'photos.*'   => 'nullable|image|max:2048', // validação para cada imagem
        ]);

        $photosPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('animals', 'public');
                $photosPaths[] = $path;
            }
        }
        $data['photos'] = $photosPaths;
        $data['user_id'] = auth()->id();

        $animal = Animal::create($data);

        return redirect()->route('animals.show', $animal->id);
    }

    // Exibe os detalhes de um animal específico
    public function show(Animal $animal)
    {
        if ($animal->user_id !== auth()->id()) {
            abort(403);
        }
        $animal->load(['breed']);
    
        // Filtra reproductions onde esse $animal aparece
        $reproductionActivities = Reproduction::with('egua','cavalo','doadora','receptor','animal','pai')
            ->where('user_id', auth()->id())
            ->where(function($query) use ($animal) {
                $query->where('egua_id', $animal->id)
                    ->orWhere('cavalo_id', $animal->id)
                    ->orWhere('doadora_id', $animal->id)
                    ->orWhere('receptor_id', $animal->id)
                    ->orWhere('animal_id', $animal->id)
                    ->orWhere('pai_id', $animal->id);
            })
            ->get();
    
        $treatments = Treatment::where('animal_id', $animal->id)->get();

        return Inertia::render('Animals/Show', [
            'animal' => $animal,
            'treatments' => $treatments,
            'reproductionActivities' => $reproductionActivities,
        ]);
    }
    

    public function edit(Animal $animal)
    {
        // Garante que o usuário só edite seus próprios animais
        if ($animal->user_id !== auth()->id()) {
            abort(403);
        }
        $breeds = Breed::all();

        return Inertia::render('Animals/Edit', [
            'animal' => $animal,
            'breeds' => $breeds,
        ]);
    }
}
