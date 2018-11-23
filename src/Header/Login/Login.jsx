import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Login extends React.Component {
  sendPromises = () => {
    const getRequestToken = () => {
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
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
            response.json().then(error => {
              reject(error);
            });
          });
      });
    };

    const validate = body => {
      return new Promise((resolve, reject) => {
        fetch(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
        )
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
            response.json().then(error => {
              reject(error);
            });
          });
      });
    };

    getRequestToken()
      .then(data => {
        return validate({
          username: "StasKhanevich",
          password: "terka2312",
          request_token: data.request_token
        });
      })
      .then(data => {
        console.log("success", data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  // 1
  //   fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // 2
  //       fetch(
  //         `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  //         {
  //           method: "POST",
  //           mode: "cors",
  //           headers: {
  //             "Content-type": "application/json"
  //           },
  //           body: JSON.stringify({
  //             username: "StasKhanevich",
  //             password: "terka2312",
  //             request_token: data.request_token
  //           })
  //         }
  //       )
  //         .then(response => response.json())
  //         .then(data => {
  //           // 3
  //           fetch(
  //             `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
  //             {
  //               method: "POST",
  //               mode: "cors",
  //               headers: {
  //                 "Content-type": "application/json"
  //               },
  //               body: JSON.stringify({
  //                 request_token: data.request_token
  //               })
  //             }
  //           )
  //             .then(response => response.json())
  //             .then(data => {
  //               console.log("session", data);
  //             });
  //         });
  //     });
  // };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    );
  }
}
