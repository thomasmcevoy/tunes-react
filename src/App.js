import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { TunesScreen, SetlistScreen, RandomScreen } from './containers'
import { Header, MenuDrawer } from './components'
import { debounce } from 'lodash'
import Tunes from './tunes'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tunes: Tunes,
      setlist: [],
      randomTune: {},
      menuIsOpen: false,
      activeRoute: '/tunes',
      filter: 'all',
      sortBy: 'title',
      tunesScrollPosition: 0,
      setlistScrollPosition: 0,
    }
    this.standardsComposers = [
      'Jerome Kern', 'Irving Berlin', 'George Gershwin', 'Vincent Youmans', 
      'Richard Rodgers', 'Jimmy McHugh', 'Hoagy Carmichael', 'Harold Arlen', 
      'Cole Porter', 'Sigmund Romberg', 'Kurt Weill', 'Arthur Schwartz',
      'Irving Caesar', 'Richard A. Whiting', 'Johnny Green', 'Harry Warren',
      'Victor Young', 'Harry Barris', 'Bernice Petkere', 'Vernon Duke', 
      'Burton Lane', 'Ben Oakland', 'Ray Noble', 'J. Fred Coots', 'Matt Malneck',
      'Ralph Rainger', 'Johnny Mercer', 'Arthur Johnston', 'Allie Wrubel',
      'Bronislaw Kaper', 'Jimmy Van Heusen', 'Sammy Fain', 'Irene Kitchings', 
      'Matt Dennis', 'Gene De Paul', 'Jule Styne', 'Alec Wilder', 'Frank Loesser',
      'Leonard Bernstein', 'Rube Bloom', 'Josef Myrow', 'Frederick Loewe',
      'Carl Sigman', 'Johnny Mandel', 'Henry Mancini'
    ]
    this.jazzComposers = [
      'Jelly Roll Morton', 'James P. Johnson', 'Fats Waller', 'Eubie Blake', 
      'Duke Ellington', 'Billy Strayhorn', 'Tadd Dameron', 'Billie Holiday', 
      'Benny Goodman', 'Count Basie', 'Neal Hefti', 'Thelonious Monk', 
      'Kenny Clarke', 'Charlie Parker', 'Dizzy Gillespie', 'Mary Lou Williams', 
      'John Louis',  'J. J. Johnson', 'Bud Powell', 'Oscar Pettiford',
      'Denzil Best', 'George Shearing', 'Gigi Gryce', 'Duke Jordan',
      'Miles Davis', 'Sonny Rollins', 'Milt Jackson', 'Horace Silver',
      'Dave Brubeck', 'Jackie McLean', 'Bill Evans', 'Benny Golson',
      'John Coltrane', 'Tommy Flanagan', 'Mal Waldron', 'Jimmy Heath',
      'Bobby Timmons', 'Wes Montgomery', 'Oliver Nelson', 'Lee Morgan',
      'Cannonball Adderley', 'Frank Rosolino', 'Duke Pearson', 'Rudy Stevenson',
      'Barry Harris', 'Freddie Hubbard', 'Kenny Dorham', 'Joe Henderson', 
      'Herbie Hancock', 'Chick Corea', 'Victor Feldman', 'Wayne Shorter', 
      'Bobby Hutcherson', 'Frank Foster', 'Thad Jones', 'Hank Jones', 
      'Cedar Walton', 'Jimmy Rowles', 'Walter Davis Jr.', 'Wynton Marsalis'
    ]
  }

  componentDidMount() {
    // Get tunes from API
    // Uncomment in production
    // ----------------------------------------------------
    // fetch('https://thomas-mcevoy.com/api/tunes/')
    //   .then(response => JSON.parse(response))
    //   .then(responseJson => this.setState({ tunes: responseJson }))
    //   .catch(error => console.log(error))

    this.setState({ randomTune: this.getNewRandomTune() })

    window.addEventListener('scroll', debounce(e => {
      if (window.location.pathname === '/tunes')
        this.setState({ tunesScrollPosition: window.scrollY })
      else if (window.location.pathname === '/setlist')
        this.setState({ setlistScrollPosition: window.scrollY })
    }, 100))
  }

  setAppState = nextState => this.setState(nextState)

  getNewRandomTune = () => {
    const filteredTunes = this.filterTunes(this.state.tunes)
    let index
    
    do { index = Math.floor(Math.random() * filteredTunes.length)}
    while (this.state.setlist.includes(filteredTunes[index]))
    
    return filteredTunes[index]
  }

  sortTunes = tunes => [...tunes].sort((a, b) => {
    const { sortBy } = this.state
    if (sortBy === 'year') return a.year - b.year
    else {
      if (a[sortBy] < b[sortBy]) return -1
      if (a[sortBy] > b[sortBy]) return 1
      return 0
    }
  })

  filterTunes = tunes => tunes.filter(tune => {
    switch(this.state.filter) {
      case '': return false
      case 'all': return true
      case 'latin': return tune.latin
      case 'blues': return tune.blues
      case 'minor': return tune.minor
      case 'miles': return tune.miles || tune.composer.includes('Miles Davis')
      case 'waltzes': return tune.waltz
      case 'ballads': return tune.ballad
      case 'holiday': return tune.holiday
      case 'sinatra': return tune.sinatra
      case 'contrafacts': return tune.contrafact
      case 'rhythm changes': return tune.rhythm
      case 'standards': return tune.composer.split(/[,&/]/).some(composer =>
        this.standardsComposers.includes(composer.trim()))
      case 'jazz compositions': return tune.composer.split(/[,&/]/).some(composer =>
        this.jazzComposers.includes(composer.trim()))
      default: return false
    }
  })

  toggleSelected = tune => this.setState((prevState, _) => {
    let nextTunes = [...prevState.tunes]
    let nextTune = nextTunes[nextTunes.indexOf(tune)]
    nextTune.selected = 'selected' in nextTune ? !nextTune.selected : true
    
    let nextSetlist = [...prevState.setlist]
    const index = nextSetlist.indexOf(tune)
    index === -1 ? nextSetlist.push(tune) : nextSetlist.splice(index, 1)  
    
    return { 
      tunes: nextTunes, 
      setlist: nextSetlist 
    }
  })

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            menuIsOpen={this.state.menuIsOpen}
            setAppState={this.setAppState}
          />
          <MenuDrawer
            sortBy={this.state.sortBy}
            filter={this.state.filter}
            setAppState={this.setAppState}
          />
          <main className="App-main">
            <Route path="/tunes" render={() =>
              <TunesScreen
                tunes={this.sortTunes(this.filterTunes(this.state.tunes))}
                sortBy={this.state.sortBy}
                scrollPosition={this.state.tunesScrollPosition}
                toggleSelected={this.toggleSelected}
                setAppState={this.setAppState}
              />
            }/>
            <Route path="/setlist" render={() =>
              <SetlistScreen
                setlist={this.state.setlist}
                toggleSelected={this.toggleSelected}
                scrollPosition={this.state.setlistScrollPosition}
              />
            }/>
            <Route path="/random" render={() => 
              <RandomScreen
                randomTune={this.state.randomTune}
                getNewRandomTune={this.getNewRandomTune}
                toggleSelected={this.toggleSelected}
                setAppState={this.setAppState}
              />
            }/>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
