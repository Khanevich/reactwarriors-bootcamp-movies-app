export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "d024515fed3788f3300834e8926d73c0";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDI0NTE1ZmVkMzc4OGYzMzAwODM0ZTg5MjZkNzNjMCIsInN1YiI6IjViZjQxYTFhYzNhMzY4NjM3NTAyZWQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AFqVtegbwNXPaMBSoLFyI8BWgeQXVo114z9AZq1mdA0";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        console.log(response);
        response.json().then(error => {
          reject(error);
        });
      });
  });
};


export default class CallApi {
  get() {
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.getTotalPages(data.total_pages);
      });
  }
}
