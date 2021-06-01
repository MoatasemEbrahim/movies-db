import axiosInstance from '../utils/axiosInstance';

const jobsAPI = {
  getGenres: async () => {
    const res = await axiosInstance.get('/genre/movie/list');
    return res.data.genres;
  },
  getMovies: async (filter:MoviesFilter, page:number) => {
    const res = await axiosInstance.get(`/movie/${filter}`, {
      params: {
        page,
      },
    });
    return res.data.results;
  },
  getMovieData: async (id:string) => {
    const res = await axiosInstance.get(`/movie/${id}`);
    return res.data;
  },
  getMovieCredits: async (id:string) => {
    const res = await axiosInstance.get(`/movie/${id}/credits`);
    return res.data;
  },
};

export default jobsAPI;

enum MoviesFilter {
  'Popular' = 'popular',
  'Top Rated' = 'top_rated',
  'Upcoming' = 'upcoming',
}
