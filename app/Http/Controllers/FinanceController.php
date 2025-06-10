<?php

namespace App\Http\Controllers;

use App\Models\FinanceEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $entries = FinanceEntry::where('user_id', $user->id)->orderByDesc('data')->get();

        $chart = FinanceEntry::where('user_id', $user->id)
            ->get()
            ->groupBy(fn ($item) => \Illuminate\Support\Carbon::parse($item->data)->format('Y-m'))
            ->map(fn ($group) => [
                'custo' => $group->where('type', 'custo')->sum('valor'),
                'receita' => $group->where('type', 'receita')->sum('valor'),
            ]);

        return Inertia::render('Finance', [
            'entries' => $entries,
            'chart'   => $chart,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:custo,receita',
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric',
            'data' => 'required|date',
        ]);

        $data['user_id'] = $request->user()->id;
        FinanceEntry::create($data);

        return redirect()->back()->with('success', 'Registro salvo com sucesso.');
    }
}
