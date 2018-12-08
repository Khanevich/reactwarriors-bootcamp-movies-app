import React from "react";
import MovieHOC from "../HOC/MovieHOC";
import { Badge, Table } from "reactstrap";
class MovieDetail extends React.Component {
  render() {
    const { movieInfo } = this.props;

    return (
      <Table>
        <tbody>
          <tr>
            <td>Статус</td>
            <td>{movieInfo.status}</td>
          </tr>
          <tr>
            <td>Дата выхода</td>
            <td>{movieInfo.release_date}</td>
          </tr>
          <tr>
            <td>Продолжительность</td>
            <td>{movieInfo.runtime} минут</td>
          </tr>
          <tr>
            <td>Язык оригинала</td>
            <td>{movieInfo.original_language}</td>
          </tr>
          <tr>
            <td>Страна</td>
            <td>
              {movieInfo.production_countries &&
                movieInfo.production_countries.map(
                  country => `${country.name}`
                )}
            </td>
          </tr>
          <tr>
            <td>Бюджет</td>
            <td>{movieInfo.budget}$</td>
          </tr>
          <tr>
            <td>Сборы</td>
            <td>{movieInfo.revenue}$</td>
          </tr>
          <tr>
            <td>Компания</td>
            <td>
              {movieInfo.production_companies &&
                movieInfo.production_companies.map(company => {
                  return (
                    <React.Fragment key={company.id}>
                      <Badge color="info">{company.name}</Badge>
                      <br />
                    </React.Fragment>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td>Жанры</td>
            <td>
              {movieInfo.genres &&
                movieInfo.genres.map(genre => (
                  <React.Fragment key={genre.id}>
                    <Badge color="info">{genre.name}</Badge>
                  </React.Fragment>
                ))}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default MovieHOC(MovieDetail);
