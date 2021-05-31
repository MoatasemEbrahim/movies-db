import axiosInstance from '../utils/axiosInstance';

const jobsAPI = {
  getMovies: async (filter:MoviesFilter, page:number) => {
    const res = await axiosInstance.get(`/movie/${filter}`, {
      params: {
        page,
      },
    });
    return res.data.results;
  },
  getGenres: async () => {
    const res = await axiosInstance.get('/genre/movie/list');
    return res.data.genres;
  },
};

export default jobsAPI;

enum MoviesFilter {
  'Popular' = 'popular',
  'Top Rated' = 'top_rated',
  'Upcoming' = 'upcoming',
}
