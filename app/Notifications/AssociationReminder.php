<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Breed;
use App\Models\Animal;
use App\Models\AssociationDeadline;

class AssociationReminder extends Notification implements ShouldQueue
{
    use Queueable;

    protected Breed $breed;
    protected AssociationDeadline $deadline;
    protected int $daysLeft;
    protected string $animalName;

    public function __construct(Breed $breed, AssociationDeadline $deadline, int $daysLeft, string $animalName)
    {
        $this->breed = $breed;
        $this->deadline = $deadline;
        $this->daysLeft = $daysLeft;
        $this->animalName = $animalName;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Lembrete de comunicação à associação')
            ->line('Faltam '.$this->daysLeft.' dia(s) para comunicar '.$this->deadline->procedure.' do animal '.$this->animalName.' à associação '.$this->breed->association->name.'.')
            ->line('Regra: '.$this->deadline->rule);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Faltam '.$this->daysLeft.' dia(s) para comunicar '.$this->deadline->procedure.' do animal '.$this->animalName.' à associação '.$this->breed->association->name.'.',
            'rule' => $this->deadline->rule,
        ];
    }
}
