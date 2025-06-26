<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #333;
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            width: 120px;
            height: auto;
            margin-bottom: 8px;
        }

        .photos {
            text-align: center;
            margin-bottom: 20px;
        }

        .photos img {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border-radius: 10px;
            margin: 0 4px 8px;
        }

        .treatment-photo {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section h2 {
            background: #3b82f6;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
            margin-bottom: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 6px;
        }

        th {
            background: #1e3a8a;
            color: #fff;
        }

        tbody tr:nth-child(even) {
            background: #f9f9f9;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{ public_path('handhorse.png') }}" alt="Handhorse" class="logo">
        <h1>Histórico de {{ $animal->name }}</h1>
    </div>

    @if(!empty($animal->photos))
        <div class="section">
            <h2>Fotos</h2>
            <div class="photos">
                @foreach(array_slice($animal->photos, 0, 4) as $photo)
                    <img src="{{ public_path('storage/' . $photo) }}" alt="Foto do animal">
                @endforeach
            </div>
        </div>
    @endif

    <div class="section">
        <h2>Dados do Animal</h2>
        <p><strong>Raça:</strong> {{ $animal->breed->name }}</p>
        <p><strong>Sexo:</strong> {{ $animal->sex === 'male' ? 'Macho' : 'Fêmea' }}</p>
        <p><strong>Data de Nascimento:</strong> {{ optional($animal->birth_date)->format('d/m/Y') }}</p>
        <p><strong>Pai:</strong> {{ $animal->father }}</p>
        <p><strong>Mãe:</strong> {{ $animal->mother }}</p>
        <p><strong>Prole:</strong> {{ $animal->progeny }}</p>
    </div>

    {{-- NOVA SEÇÃO DE VACINAS --}}
    <div class="section">
        <h2>Vacinas</h2>
        @forelse($vaccines as $vac)
            <div style="margin-bottom: 12px; display: flex; align-items: center; flex-wrap: wrap;">
                <div style="flex:1;">
                    <strong>Data:</strong> {{ optional($vac->date)->format('d/m/Y') }}<br>
                    <strong>Tipo:</strong>
                    @if(is_array($vac->details) && isset($vac->details['type']))
                        {{ $vac->details['type'] }}
                    @else
                        {{ $vac->treatmentType->name ?? '' }}
                    @endif
                </div>
                @if(is_array($vac->details) && isset($vac->details['photo']))
                    @php
                        $photoPath = public_path('storage/' . $vac->details['photo']);
                        $isWebp = file_exists($photoPath) && mime_content_type($photoPath) === 'image/webp';
                    @endphp
                    <div style="margin-left: 16px;">
                        @if(!$isWebp)
                            <img src="{{ $photoPath }}" alt="Vacina" class="treatment-photo">
                        @else
                            <span style="color: red; font-size: 10px;">(Imagem .webp não suportada no PDF)</span>
                        @endif
                    </div>
                @endif
            </div>
        @empty
            <p>Nenhuma vacina registrada.</p>
        @endforelse
    </div>

    <div class="section">
        <h2>Procedimentos de Saúde</h2>
        <table>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Detalhes</th>
                    <th>Foto</th>
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
                        <td>
                            @if(is_array($t->details) && isset($t->details['photo']))
                                @php
                                    $photoPath = storage_path('app/public/' . $t->details['photo']);
                                    $isWebp = file_exists($photoPath) && mime_content_type($photoPath) === 'image/webp';
                                @endphp

                                @if(!$isWebp)
                                    <img src="{{ $photoPath }}" alt="Vacina" class="treatment-photo">
                                @else
                                    <span style="color: red; font-size: 10px;">(Imagem .webp não suportada no PDF)</span>
                                @endif
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">Nenhum procedimento registrado.</td>
                    </tr>
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
                                Égua: {{ $rep->egua->name ?? $rep->egua_name }} - Cavalo:
                                {{ $rep->cavalo->name ?? $rep->cavalo_name }}
                            @elseif($rep->type === 'transferencia')
                                Doadora: {{ $rep->doadora->name ?? $rep->doadora_name }} - Receptor:
                                {{ $rep->receptor->name ?? $rep->receptor_name }} - Cavalo:
                                {{ $rep->cavalo->name ?? $rep->cavalo_name }}
                            @elseif($rep->type === 'confirmacao_prenhes')
                                Animal: {{ $rep->animal->name ?? $rep->animal_name }} - Pai:
                                {{ $rep->pai->name ?? $rep->pai_name }} - Data Exame:
                                {{ optional($rep->date_exame)->format('d/m/Y') }} - Data Provável:
                                {{ optional($rep->date_provavel)->format('d/m/Y') }}
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">Nenhuma reprodução registrada.</td>
                    </tr>
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
                    <tr>
                        <td colspan="3">Nenhuma premiação registrada.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>

</html>