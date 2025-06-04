<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        h1, h2 { text-align: center; margin-bottom: 10px; }
        .section { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #ccc; padding: 4px; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>
    <h1>Histórico de {{ $animal->name }}</h1>

    <div class="section">
        <h2>Dados do Animal</h2>
        <p><strong>Raça:</strong> {{ $animal->breed->name }}</p>
        <p><strong>Sexo:</strong> {{ $animal->sex === 'male' ? 'Macho' : 'Fêmea' }}</p>
        <p><strong>Data de Nascimento:</strong> {{ optional($animal->birth_date)->format('d/m/Y') }}</p>
        <p><strong>Pai:</strong> {{ $animal->father }}</p>
        <p><strong>Mãe:</strong> {{ $animal->mother }}</p>
        <p><strong>Prole:</strong> {{ $animal->progeny }}</p>
    </div>

    <div class="section">
        <h2>Procedimentos de Saúde</h2>
        <table>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Detalhes</th>
                </tr>
            </thead>
            <tbody>
                @forelse($treatments as $t)
                    <tr>
                        <td>{{ $t->treatmentType->name ?? '' }}</td>
                        <td>{{ optional($t->date)->format('d/m/Y') }}</td>
                        <td>
                            @if(is_array($t->details))
                                @if(isset($t->details['type'])){{ $t->details['type'] }}<br>@endif
                                @if(isset($t->details['procedimento'])){{ $t->details['procedimento'] }}<br>@endif
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="3">Nenhum procedimento registrado.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Reproduções</h2>
        <table>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Detalhes</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reproductions as $rep)
                    <tr>
                        <td>{{ $rep->type }}</td>
                        <td>{{ $rep->date?->format('d/m/Y') ?? $rep->date_exame?->format('d/m/Y') }}</td>
                        <td>
                            @if($rep->type === 'monta_natural' || $rep->type === 'inseminacao')
                                Égua: {{ $rep->egua->name ?? $rep->egua_name }} - Cavalo: {{ $rep->cavalo->name ?? $rep->cavalo_name }}
                            @elseif($rep->type === 'transferencia')
                                Doadora: {{ $rep->doadora->name ?? $rep->doadora_name }} - Receptor: {{ $rep->receptor->name ?? $rep->receptor_name }} - Cavalo: {{ $rep->cavalo->name ?? $rep->cavalo_name }}
                            @elseif($rep->type === 'confirmacao_prenhes')
                                Animal: {{ $rep->animal->name ?? $rep->animal_name }} - Pai: {{ $rep->pai->name ?? $rep->pai_name }} - Data Exame: {{ optional($rep->date_exame)->format('d/m/Y') }} - Data Provável: {{ optional($rep->date_provavel)->format('d/m/Y') }}
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="3">Nenhuma reprodução registrada.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Premiações</h2>
        <table>
            <thead>
                <tr>
                    <th>Competição</th>
                    <th>Colocação</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                @forelse($awards as $award)
                    <tr>
                        <td>{{ $award->competition }}</td>
                        <td>{{ $award->position }}</td>
                        <td>{{ optional($award->date)->format('d/m/Y') }}</td>
                    </tr>
                @empty
                    <tr><td colspan="3">Nenhuma premiação registrada.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>
</html>
