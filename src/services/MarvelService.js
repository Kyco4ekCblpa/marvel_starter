import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '7dd0d7380217ffed7bf14f2ab91aad1e';
    const _baseOffset = 210;

    const makeRequest = async (url, params = {}) => {
        params.apikey = _apiKey; 
        const str = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');

        const res = await request(`${_apiBase}${url}?${str}`);
        return res.data.results;
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await makeRequest('characters', { limit: 9, offset: offset });
        return res.map(_transformCharacterData);
    }

    const getCharacterById = async (id) => {
        const res = await makeRequest(`characters/${id}`);
        return _transformCharacterData(res[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await makeRequest('comics', { orderBy: 'issueNumber', limit: 8, offset: offset });
		return res.map(_transformComics);
	};

	const getComicById = async (id) => {
        const res = await makeRequest(`comics/${id}`);
		return _transformComics(res[0]);
	};


    const getCharacterByName = async (name) => {
        const res = await makeRequest('characters', {name: name});
        return res.map(_transformCharacterData);
	};

    const _transformCharacterData = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {loading, error, clearError, getAllCharacters, getCharacterById, getAllComics, getComicById, getCharacterByName};
}

export default useMarvelService;