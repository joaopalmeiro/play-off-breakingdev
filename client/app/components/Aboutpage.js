import React, {Component} from 'react';
import aboutImg from '../../public/assets/img/aboutus.svg';

class Aboutpage extends Component {
  render() {
    return (
        <div className="container">
          <div className="WelcomeMessage">
            <h1>About Play/Off</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices bibendum justo at bibendum. Ut a bibendum odio. Vestibulum quis lectus vitae velit tincidunt fermentum id ac est. Aliquam aliquet scelerisque egestas. Cras sollicitudin ipsum sit amet massa condimentum, non sollicitudin magna ullamcorper. Curabitur porta varius faucibus. Integer odio turpis, vehicula sit amet purus vitae, bibendum auctor nisi. Mauris eleifend metus ultrices vehicula tristique.Maecenas luctus ante ac luctus congue. Donec a imperdiet erat. Ut tincidunt odio sit amet mauris maximus accumsan. Suspendisse quis suscipit nisi. Praesent faucibus fermentum risus ac ultrices. Sed vehicula lectus magna, quis feugiat risus aliquam at. Integer varius augue vel pharetra eleifend. Duis tincidunt eu dolor vel fringilla. Praesent metus sapien, accumsan eget lacus quis, semper lacinia velit. Ut et gravida mi.</p>
            <div id="background-aboutus" dangerouslySetInnerHTML={{ __html: aboutImg }}></div>
        </div>
      </div>

    );
  }
}

export default Aboutpage;
