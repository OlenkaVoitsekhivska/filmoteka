import axios from 'axios';
const API_KEY = "7a92417a5af1e8667d171d8c5ef3af4e";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';



export class API_service{
  language = localStorage.getItem('language');
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.language;
    }
 
  
    async fetchTrending() {
      try {
      const { data } = await axios("trending/all/day", {
            params: {
            api_key: API_KEY 
            }});
          this.page++;
          console.log(data);
      return data;
      } catch (error) {
      console.log(error);
      }
    }

    async fetchMoviesByKeyword() {
      try {
      const { data } = await axios("search/movie", {
            params: {
            api_key: API_KEY,
            query: this.searchQuery,
            language: this.language,
            page:this.page,
            }});
          this.page++;
          console.log(data);
      return data //returns an OBJECT. e.g.{page: 1, results: Array(20), total_pages: 8, total_results: 147}
      } catch (error) {
      console.log(error)
      }
     }
  
  
    async fetchMovieById() {//will throw an error if title "undefined";
      try {
      const { data }  = await axios(`movie/${this.searchQuery}` , { //for this to work make sure this.searchQuery type is number!!! 
            params: {
            api_key: API_KEY,
            language: this.language,
            }});
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }

}

    get query() {
      return this.searchQuery;
    }

    set query(newQuery) {
      this.searchQuery = newQuery;
    }
}
