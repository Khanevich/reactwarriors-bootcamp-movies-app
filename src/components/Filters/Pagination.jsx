import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";

class Pagination extends React.PureComponent {
  pageDecrement = () => {
    this.props.onChangePage(this.props.page - 1);
  };

  pageIncrement = () => {
    this.props.onChangePage(this.props.page + 1);
  };

  render() {
    const { page, total_pages } = this.props;
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={this.pageDecrement}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.pageIncrement}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          {page} из {total_pages}
        </div>
      </React.Fragment>
    );
  }
}

export default AppContextHOC(Pagination);
