import React from "react";

export default class Pagination extends React.PureComponent {
  render() {
    const { onChangePage, page, total_pages } = this.props;
    console.log("pagination");
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => {
              onChangePage(page - 1);
            }}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              onChangePage(page + 1);
            }}
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
