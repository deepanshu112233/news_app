import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
//passing props in class based component using above
export class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize:8,
    category: 'general'

 
  }
  static propTypes={
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props){
    super(props)//this must be called for constructor
    console.log("Hello")
    this.state={
        articles:[],
        loading:false,
        page:1
    }
    document.title= `NewsMonkey-${this.props.category}`
  }

  async updateNews(){

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94f319feb39f4cd7a357858c0a386d8f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    
    let parsedData = await data.json()
    console.log(parsedData)  
    this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
  }
  
  //Live cycle method,this will run after render
  //async function inside its body wait for promises to getting resolve
  async componentDidMount(){
    this.updateNews()
    this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
  }
  handleBack=async ()=>{
    
    this.setState({page:this.state.page-1})
    this.updateNews()
  }
  handleNext=async ()=>{
    
    this.setState({page:this.state.page+1})
    this.updateNews()
    // }
  }
  //reading title and des from articles, url is my unique for evry news so it is id
  render() {
    
    return (
      <div className='container'>
        
        <br/>  
        <h2 className='text-center'>
 Headlines  </h2>
        {this.state.loading && <Spinner/>} 
        <div className='row'>

        { !this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
            <NewsItem source={element.source.name}  title={element.title?element.title:""} description={element.description?element.description.slice(0,60):""} imgUrl={element.urlToImage} newsUrl={element.url} 
            author={element.author} date={element.publishedAt} 
            />
            </div>
        })}
        </div>
        <div className='d-flex justify-content-center'>
        <button disabled={this.state.page<=1} type='button' className='btn btn-primary mx-2 my-2' onClick={this.handleBack} >&larr; Back</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize))} type='button' className='btn btn-primary mx-2 my-2' onClick={this.handleNext} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News