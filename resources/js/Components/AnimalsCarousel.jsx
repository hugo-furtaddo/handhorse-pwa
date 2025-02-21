import React from 'react';
import Slider from 'react-slick';
import { Link } from '@inertiajs/react';

// Importa os estilos do react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AnimalsCarousel({ animals }) {
    const settings = {
        dots: true,
        infinite: animals && animals.length > 1,
        speed: 500,
        slidesToShow: animals && animals.length > 1 ? 3 : 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: animals && animals.length > 1 ? 2 : 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
        ],
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Animais</h3>
            {animals && animals.length > 0 ? (
                <Slider {...settings}>
                    {animals.map(animal => (
                        <div key={animal.id} className="p-4">
                            <Link href={route('animals.show', animal.id)}>
                                <div className="bg-gray-100 rounded shadow p-4 hover:shadow-lg transition-shadow duration-300">
                                    <div className="h-32 w-full overflow-hidden rounded mb-2 flex items-center justify-center">
                                        {animal.photos && animal.photos.length > 0 ? (
                                            <img
                                                src={`/storage/${animal.photos[0]}`}
                                                alt={`Foto de ${animal.name}`}
                                                className="object-contain h-full w-full"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                                Sem foto
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-center">{animal.name}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>Nenhum animal cadastrado.</p>
            )}
        </div>
    );
}