import React from "react";

export default class Pagination extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light"
            disabled={this.props.page === 1}
            onClick={() => {
              this.props.onChangePage(this.props.page - 1);
            }}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              this.props.onChangePage(this.props.page + 1);
            }}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          {this.props.page} из {this.props.total_pages}
        </div>
      </React.Fragment>
    );
  }
}
