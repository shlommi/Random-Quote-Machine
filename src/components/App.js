import React from "react";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.END_POINT =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    this.state = {
      hasQuote: false,
      quoteData: {
        quote: "",
        author: ""
      }
    };
  }

  componentDidMount() {
    if (this.state.hasQuote === false) {
      this.handleNewQuoteClick();
    }
  }

  handleNewQuoteClick = () => {
    fetch(this.END_POINT)
      .then(res => res.json())
      .then(data => {
        let rand = Math.floor(Math.random() * 100);
        let quoteFromEndPoint = data.quotes[rand];
        // console.log(data.quotes[rand]);
        if (quoteFromEndPoint.quote && quoteFromEndPoint.author) {
          let { quoteData } = this.state;
          quoteData.quote = quoteFromEndPoint.quote;
          quoteData.author = quoteFromEndPoint.author;
          this.setState(
            {
              quoteData
            },
            () => {
              if (this.state.hasQuote === false) {
                this.setState({ hasQuote: true });
              }
            }
          );
        } else {
          console.log("no quote has been found 404");
        }
      });
  };
  render() {
    const { hasQuote } = this.state;
    const { quote, author } = this.state.quoteData;

    if (hasQuote === false) {
      return <div className="loading">Loading... </div>;
    } else {
      return (
        <div className="container">
          <div id="quote-box">
            <div id="text">
              <p>
                <span>"</span>
                {quote}
              </p>
            </div>
            <div id="author">
              <p>-{author}</p>
            </div>
            <div className="buttons">
              <a
                href="https://twitter.com/intent/tweet"
                target="_blanket"
                id="tweet-quote"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
              <button onClick={this.handleNewQuoteClick} id="new-quote">
                New quote
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
