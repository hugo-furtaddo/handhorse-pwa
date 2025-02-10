import React from 'react';
import Slider from 'react-slick';
import { Link } from '@inertiajs/react';

// Importa os estilos do react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AnimalsCarousel({ animals }) {
    const settings = {
        dots: true,
        infinite: animals.length > 1, // Ativa infinite somente se houver mais de um animal
        speed: 500,
        slidesToShow: animals.length > 1 ? 3 : 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, infinite: false },
            },
        ],
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Animais</h3>
            {animals && animals.length > 0 ? (
                <div className="w-full">
                    <Slider {...settings}>
                        {animals.map(animal => (
                            <div key={animal.id} className="p-4">
                                <Link href={route('animals.show', animal.id)}>
                                    <div className="bg-gray-100 rounded shadow p-4">
                                        <div className="h-32 w-full overflow-hidden rounded mb-2">
                                            {animal.photos && animal.photos.length > 0 ? (
                                                <img
                                                    src={`/storage/${animal.photos[0]}`}
                                                    alt={animal.name}
                                                    className="object-contain h-full w-full"
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
                </div>
            ) : (
                <p>Nenhum animal cadastrado.</p>
            )}
        </div>
    );
}
