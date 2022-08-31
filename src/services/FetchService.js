import {useHttp} from '../hooks/useHttp'

const useFetchService = () => {
    const {loading, request, error, clearError} = useHttp();

    const getAllFilms = async () => {
        const res = await request('http://localhost:3001/films');
        return res.map(_transformFilm)
    }

    const getFilm = async (id) => {
        const res = await request(`http://localhost:3001/films/${id}`);
        return _transformFilm(res);
    }

    const getAllSerials = async () => {
        const res = await request('http://localhost:3001/serials');
        return res.map(_transformFilm);
    }

    const getSerial = async (id) => {
        const res = await request(`http://localhost:3001/serials/${id}`);
        return _transformFilm(res);
    }

    const _transformFilm = (film) => {
        return {
            id: film.id,
            genre: film.genre,
            rating: film.rating,
            title: film.title,
            img: film.img,
            translate: film.translate,
            age: film.age,
            description: film.description,
            duration: film.duration,
            marks: film.marks,
            audioTarcks: film.audioTarcks,
            subtitles: film.subtitles,
            videoQuality: film.videoQuality,
            year: film.year,
            Country: film.Country,
            fullGenre: film.fullGenre,
            tagline: film.tagline,
            director: film.director,
            scenario: film.scenario,
            producers: film.producers,
            operator: film.operator,
            composer: film.composer,
            painter: film.painter,
            mounting: film.mounting,
            budget: film.budget,
            feesUSA: film.feesUSA,
            feesWorld: film.feesWorld,
            premiere: film.premiere,
            ratingMPAA: film.ratingMPAA,
            trailerDuration: film.trailerDuration,
            actors: film.actors,
            dubbing: film.dubbing,
            review: film.review,
            trailerImg: film.trailerImg,
            seasons: film.seasons
        }
    }



    return {loading, error, clearError, getAllFilms, getFilm, getAllSerials, getSerial}
}

export default useFetchService;