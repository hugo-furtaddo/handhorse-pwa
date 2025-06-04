<?php

namespace App\Http\Controllers;

use App\Models\Award;
use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AwardController extends Controller
{
    public function store(Request $request, Animal $animal)
    {
        $this->authorize('update', $animal);

        $data = $request->validate([
            'competition' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'date' => 'nullable|date',
        ]);

        $data['animal_id'] = $animal->id;
        Award::create($data);

        return redirect()->route('animals.show', $animal);
    }
}
