import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

var BeerFacts = React.createClass({
  render: function(){
    return (
      <div className='beer-can-selector__panel lap-and-up-one-third palm-one-whole'>
        <h2 className='beer-can-selector__header h2'>{this.props.name}</h2>
        <table className='beer-can-selector__fact-table'>
          <tbody>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>mls</td>
              <td className='beer-can-selector__fact'>{this.props.facts.cans}</td>
            </tr>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>ABV</td>
              <td className='beer-can-selector__fact'>{this.props.facts.abv}</td>
            </tr>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>OG</td>
              <td className='beer-can-selector__fact'>{this.props.facts.og}</td>
            </tr>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>IBU</td>
              <td className='beer-can-selector__fact'>{this.props.facts.ibu}</td>
            </tr>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>Malts</td>
              <td className='beer-can-selector__fact'>{this.props.facts.malts.join(', ')}</td>
            </tr>
            <tr className='beer-can-selector__fact-row'>
              <td className='beer-can-selector__fact-term'>Finishing Hops</td>
              <td className='beer-can-selector__fact'>{this.props.facts.hops.join(', ')}</td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
});

var BeerDescription = React.createClass({
  render: function(){
    return (
      <div className='beer-can-selector__panel lap-and-up-one-third palm-one-whole'>
        {this.props.description}
      </div>
    );
  }
});

var BeerVideo = React.createClass({
  render: function(){
    return (
      <div className='beer-can-selector__panel lap-and-up-one-third palm-one-whole'>
        <iframe width='200' height='100' src={this.props.videoUrl} frameBorder='0'></iframe>
      </div>
     );
  }
});

var BeerCanSelector = React.createClass({
  propTypes: {
    onPanelChange: React.PropTypes.func.isRequired
  },

  itemClicked: function(index){
    this.props.onPanelChange(index);
  },

  render: function(){
    var self = this;

    return (
      <div className={'wrapper wrapper--can-list-container'}>
        <div className={'container beer-can-selector__can-list-container'}>
          <ul className={'beer-can-selector__can-list'}>
            {
              this.props.beers.map(function(beer, index){
                var beerNameClass = ' beer-can-selector__can-list-item--' + beer.name.toLowerCase();
                var classes = classNames({
                  'beer-can-selector__can-list-item' : true,
                  'beer-can-selector__can-list-item--active': self.props.activePanelIndex === index,
                  'beer-can-selector__can-list-item--initial': self.props.activePanelIndex === null
                });

                var imageSrc = self.props.activePanelIndex === index ? beer.images.active : beer.images.passive;

                return (
                  <li className={classes + beerNameClass} key={index} onClick={self.itemClicked.bind(null, index)}>
                    <img className='beer-can-selector__can-list-image' src={imageSrc} alt={beer.name} />
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});

var BeerInformationPanel = React.createClass({

  render: function(){
    var self = this;

    return (
      <div className={'wrapper wrapper--beer-can-selector'}>
        <div className='container beer-can-selector__panel-container'>
          {
            this.props.beers.map(function (beer, index) {
              var classes = classNames({
                'beer-can-selector__information-panel' : true,
                'beer-can-selector__information-panel--active': self.props.activePanelIndex === index
              });

              return (
                <div key={index} className={classes}>
                  <BeerFacts facts={beer.facts} name={beer.name} />
                  <BeerDescription description={beer.description} />
                  <BeerVideo videoUrl={beer.videoUrl} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});

var BeerInformationCarousel = React.createClass({
  getInitialState: function(){
    return {
      activePanelIndex: null
    };
  },

  componentDidMount: function(){
    $('.beer-can-selector').fitVids();
  },

  componentDidUpdate: function(){
    $('.beer-can-selector').fitVids();
  },

  render: function(){
    return (
      <div>
        <BeerCanSelector beers={this.props.beers} activePanelIndex={this.state.activePanelIndex} onPanelChange={this.onPanelChange} />
        <BeerInformationPanel beers={this.props.beers} activePanelIndex={this.state.activePanelIndex} />
      </div>
    );
  },

  onPanelChange: function(index){
    this.setState({activePanelIndex: index});
  }
});

var BEERS = [
  {
    name: 'Pale Ale',
    facts: {
      cans: 355,
      kegs: 50,
      abv: 5.4,
      og: '1.053,5',
      ibu: 50,
      malts: ['Ale Malt', 'Caramalt', 'Crystal'],
      hops: ['Mosaic', 'Cascade']
    },
    description: [<p key={1}>The ubiquitous Pale Ale. The workhorse of pretty much any modern brewery.</p>,
                  <p key={2}>The brief we gave ourselves for our flagship beer was that it should be able to be sent to any bar in San Diego and to stand proudly alongside the many great Pales produced in, and around, the west coast of the US.</p>,
                  <p key={3}>The schematic for a West Coast Pale Ale is bucket loads of big US hops, full malty backbone and a characterful yeast. That is what this Pale Ale is all about. Enjoy as fresh as possible.</p>,
                  <p key={4}>Beer pairing: Everything, all of the time.</p>],
    videoUrl: 'http://www.youtube.com/embed/m9Grd2Bq_Ec?rel=0&amp;controls=0&amp;showinfo=0',
    images: {
      active: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/pale_click.png',
      passive: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/pale_passive.png'
    }
  },
  {
    name: 'Throwback IPA',
    facts: {
      cans: 355,
      kegs: 50,
      abv: 3.5,
      og: '1.040',
      ibu: 35,
      malts: ['Maris Otter', 'Carapils', 'Crystal', 'Wheat'],
      hops: ['Crystal', 'NZ Cascade', 'Simcoe']
    },
    description: [ <p key={1}>We love beer! We love beer so much that we want drink beer pretty much all of the time. Unfortunately the level of alcohol in most beer, with any hint of flavour, has quite the profound effect on us performing as a functioning and productive human. We need a reduced alcohol solution.</p>,
                   <p key={2}>Enter our ThrowBack IPA.</p>,
                   <p key={3}>Designed for intelligent and sexy humans who'd like to be able to throw back a few cans of a zealously hopped ale, endowed with an ample malt chassis, and still get on with their day.</p>,
                   <p key={4}>Pairing suggestion: Cooking, eating, camping, sailing, lawn mowing, home brewing, in-law visiting*, hiking, riding and doing.</p>,
                   <p key={5}><i>*You may need something stronger after visiting with the in-laws.</i></p>],
    videoUrl: 'http://www.youtube.com/embed/KkRThO4bsOE?rel=0&amp;controls=0&amp;showinfo=0',
    images: {
      active: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/throwback_click.png',
      passive: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/throwback_passive.png'
    }
  },
  {
    name: 'IIPA',
    facts: {
      cans: 500,
      kegs: 50,
      abv: 8.8,
      og: '1.077',
      ibu: 120,
      malts: ['Ale Malt', 'Maris Otter', 'CaraPils', 'Wheat'],
      hops: ['Centennial', 'Columbus', 'Simcoe', 'Mosaic']
    },
    description: [<p key={1}>Crafting great beer is all about balance. At one end of the scale, if you’re brewing a delicate Western European lager, you have to ensure that the four ingredients work in harmony. These more delicate styles take incredible skill to brew well as there’s nowhere to hide any miscalculations or mistakes throughout production.</p>,
      <p key={2}>Launching to the almost extreme opposite, the realm of IIPAs, balance, surprisingly, is still a defining factor. Instead of delicacy in balance, it’s now big flavour in balance.</p>,
      <p key={3}>Simplistically, to achieve a big flavourful IIPA you need: Big Malt + Big Hops + Big Fermentation.</p>,
      <p key={4}>It’s a bit of complicated symbiosis between these three requirements and each of these three provide multiple elements. The malt provides the complex spectrum of sugars for fermentation as well as the main structure and body of the beer. The hops contribute bitterness to balance the malt sweetness as well as resinous piney flavours and juicy fruity-citrusy aromas. The fermentation provides us with a big hit of fun juice (ethanol) and the vast array of incredibly important characterful aroma and flavour compounds.</p>,
      <p key={5}>Not sure if that was too far off track, anyway, what you needed to take away from that was: Pirate Life IIPA is a big beer with big delicious fresh flavours that we hope you will enjoy by sticking it in your big mouth. Peace.</p>],
    videoUrl: 'http://www.youtube.com/embed/LOY0X7SUG58?rel=0&amp;controls=0&amp;showinfo=0',
    images: {
      active: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/IIPA_click.png',
      passive: 'http://s3-ap-southeast-2.amazonaws.com/pirate-life-images/IIPA_passive.png'
    }
  }
];
var containerClassName = 'content__block--beer-can-selector';

if(document.getElementsByClassName(containerClassName).length > 0) {
  ReactDOM.render(<BeerInformationCarousel beers={BEERS} />, document.getElementsByClassName(containerClassName)[0]);
}
