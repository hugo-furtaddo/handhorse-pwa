<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Association;
use App\Models\AssociationDeadline;

class AssociationSeeder extends Seeder
{
    public function run()
    {
        $associations = [
            'ABCCMM' => [
                'breeds' => ['MANGALARGA MARCHADOR'],
                'deadlines' => [
                    'cobricao' => ['rule' => '120 dias para cobrição e nascimento (sem multa)', 'days' => 120],
                    'nascimento' => ['rule' => '120 dias (multa 300,00 por animal)', 'days' => 120],
                    'resenha' => ['rule' => 'se comunicado a cobrição e nascimento no prazo terá até 02 anos ( multa 300,00 por animal)', 'days' => 730],
                    'te' => ['rule' => 'se comunicado a cobrição e nascimento no prazo terá até 02 anos ( multa 300,00 por animal)', 'days' => 730],
                ]
            ],
            'ABCCRM' => [
                'breeds' => ['MANGALARGA'],
                'deadlines' => [
                    'cobricao' => ['rule' => 'Primeiro semestre de jan a junho prazo até 31 de agosto. De julho a dez prazo até 28 fevereiro (a cada 6 meses multa 233,00)', 'days' => null],
                    'nascimento' => ['rule' => '6 meses para enviar (a cada seis meses multa 233,00)', 'days' => 180],
                    'resenha' => ['rule' => '6 meses para enviar (a cada seis meses multa 233,00)', 'days' => 180],
                    'te' => ['rule' => 'não tem um prazo (não tem um valor)', 'days' => null],
                ]
            ],
            'ABCC' => [
                'breeds' => ['PONEI', 'PIQUIRA'],
                'deadlines' => [
                    'cobricao' => ['rule' => 'envio a campo até 30/04 se for controlada 120 dias contado do ultimo dia', 'days' => 120],
                    'nascimento' => ['rule' => '120 dias', 'days' => 120],
                    'resenha' => ['rule' => 'não tem data limite', 'days' => null],
                    'te' => ['rule' => '120 dias', 'days' => 120],
                ]
            ],
            'ABCPAMPA' => [
                'breeds' => ['PAMPA'],
                'deadlines' => [
                    'cobricao' => ['rule' => 'No primeiro semestre até 31 de julho. No segundo semestre até 31 janeiro. 30 dias de atraso 50,00 + artigo 43 DNA VP', 'days' => null],
                    'nascimento' => ['rule' => '90 dias para comunicar. Mais 30 dias 50,00 de multa', 'days' => 90],
                    'resenha' => ['rule' => 'ao pé da égua, tem que fazer o dna com exame de parentesco. Não existe multa', 'days' => null],
                    'te' => ['rule' => 'No primeiro semestre até 31 de julho. No segundo semestre até 31 janeiro. 30 dias de atraso 50,00 + artigo 43 DNA VP', 'days' => null],
                ]
            ],
            'ABCJPEGA' => [
                'breeds' => ['PEGA'],
                'deadlines' => [
                    'cobricao' => ['rule' => '120 dias sem multa. Acima de 120 dias 40,00 reais por animal', 'days' => 120],
                    'nascimento' => ['rule' => '120 dias sem multa. Acima de 120 dias 40,00 reais por animal', 'days' => 120],
                    'resenha' => ['rule' => '01 ano sem multa', 'days' => 365],
                    'te' => ['rule' => '120 dias por atraso 40,00 reais', 'days' => 120],
                ]
            ],
            'ABCCC' => [
                'breeds' => ['CRIOULO'],
                'deadlines' => [
                    'cobricao' => ['rule' => 'Comunicação ate dia 30/06. Multa para socio 227,00 não socio 454,00 por comunicado', 'days' => 365],
                    'nascimento' => ['rule' => 'depende da idade do animal. Após 9 meses multa 304,00 que aumenta conforme idade', 'days' => 273],
                    'resenha' => ['rule' => 'não tem data limite. Nem multa', 'days' => null],
                    'te' => ['rule' => 'Ate 30/06 da temporada corrente. Não tem a opção de passar do prazo.', 'days' => 365],
                ]
            ],
        ];

        foreach ($associations as $name => $data) {
            $association = Association::firstOrCreate(['name' => $name]);

            foreach ($data['breeds'] as $breedName) {
                \App\Models\Breed::where('name', $breedName)->update(['association_id' => $association->id]);
            }

            foreach ($data['deadlines'] as $procedure => $info) {
                AssociationDeadline::firstOrCreate([
                    'association_id' => $association->id,
                    'procedure' => $procedure,
                ], [
                    'rule' => $info['rule'],
                    'days' => $info['days'],
                ]);
            }
        }
    }
}
