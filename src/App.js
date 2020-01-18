// @flow
import React, { useState }  from 'react'
import { numbers } from './services/axios.instance'
import { Mobile, Tablet, FromTablet } from './components/screens'

const App = () => {

  const [facts, setFacts] = useState([]) 
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const year = e.target.year.value

    numbers.get(`${year}/year`)
      .then(res =>{
        const {data} = res
        const idx = data.indexOf(' ')
        setFacts( state => [{ year, value: data.substring(idx, data.length) }, ...state])
      })
      
      e.target.reset()
  }
  
  const groupByYear = (acc, curr) => {

    const elem = acc.find( elem => elem.year === curr.year) 
    console.log('object', elem)
    if(!elem) {
      acc.push( { year: curr.year, data: [curr.value]})
    } else {
      elem.data.push(curr.value)
    }
    
    return acc
  }

  const gyears = facts.reduce(groupByYear, [])

  console.log('year', gyears)
  
  return (
    <main className="h-screen p-5">
      <Mobile>
        <form onSubmit={handleSubmit} className="flex flex-col mb-5">
          <div className="flex flex-col">
            <label className="mb-2 text-lg">Select an year:</label>
            <input type="number" name="year" className="border border-gray rounded h-10 mb-2 p-3"/>
          </div>
          <button className="rounded bg-blue-700 p-2 w-full text-white font-bold tracking-wide">Submit</button>
        </form>
        <div>
          {
            facts.map(f => (
              <div className="border border-gray rounded p-2 mb-2 shadow">
                <div className="font-bold border-b border-gray mb-1 pb-1 ">
                  {f.year}
                </div>
                <p className="normal-case capitalize-first-letter">
                  {f.value}
                </p>
              </div>
            ))
          }
        </div>
      </Mobile>
      <FromTablet>
        <form onSubmit={handleSubmit} className="flex items-center mb-5">
          <input type="number" name="year" className="border border-gray rounded h-10 mr-2 p-3 w-2/3" placeholder={'Write an year'}/>
          <button className="rounded bg-blue-700 p-2 text-white font-bold tracking-wide w-1/3">Submit</button>
        </form>
        <div className="flex -mx-3 flex-wrap">
          {gyears.map(elem => <GroupedYears year={elem.year} facts={elem.data}/>)
          }
        </div>
      </FromTablet>
    </main>
  )
}


const GroupedYears = ({ year, facts}) => {

  return (
    <div className="border border-gray rounded p-3  mx-3 shadow w-1/4 mb-3">
      <div className="font-bold border-b border-gray mb-1 pb-1 ">
        {year}
      </div>
      <div>
        {facts.map(f => (
          <p className="normal-case pb-1 capitalize-first-letter border-b last:border-b-0">
            {f}
          </p>
        ))}
      </div>
    </div>

  )
}
export default App
