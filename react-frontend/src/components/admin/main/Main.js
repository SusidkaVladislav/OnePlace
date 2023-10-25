import React, { Component} from 'react';
import "./MainStyle.css";
import ArrowIcon from "../../icons/ArrowIcon";
import ArrowIcon2 from "../../icons/ArrowIcon2";
import ItemMenuIcon1 from '../../icons/ItemMenuIcon1';
import ItemMenuIcon2 from '../../icons/ItemMenuIcon2';
import ItemMenuIcon3 from '../../icons/ItemMenuIcon3';
import ItemSalesIcon1 from '../../icons/ItemSalesIcon1';
import ItemSalesIcon2 from '../../icons/ItemSalesIcon2';
import ItemSalesIcon3 from '../../icons/ItemSalesIcon3';
import ItemMain from './ItemMain/ItemMain';
import ItemSales from './ItemSales/ItemSales';
import ItemOrder from './ItemOrder/ItemOrder';
import ItemUser from './ItemUser/ItemUser';
import ItemMessage from './ItemMessage/ItemMessage';
import ItemProduct from './ItemProduct/ItemProduct';
import ItemCategory from './ItemCategory/ItemCategory';
import ItemExit from './ItemExit/ItemExit';
import ItemReview from './ItemReview/ItemReview';
import ItemOrderIcon1 from '../../icons/ItemOrderIcon1';
import ItemOrderIcon2 from '../../icons/ItemOrderIcon2';
import ItemOrderIcon3 from '../../icons/ItemOrderIcon3';
import ItemUserIcon1 from '../../icons/ItemUserIcon1';
import ItemUserIcon2 from '../../icons/ItemUserIcon2';
import ItemUserIcon3 from '../../icons/ItemUserIcon3';
import ItemMessageIcon1 from '../../icons/ItemMessageIcon1';
import ItemMessageIcon2 from '../../icons/ItemMessageIcon2';
import ItemMessageIcon3 from '../../icons/ItemMessageIcon3';
import ItemProductIcon1 from '../../icons/ItemProductIcon1';
import ItemProductIcon2 from '../../icons/ItemProductIcon2';
import ItemProductIcon3 from '../../icons/ItemProductIcon3';
import ItemCategoryIcon1 from '../../icons/ItemCategoryIcon1';
import ItemCategoryIcon2 from '../../icons/ItemCategoryIcon2';
import ItemCategoryIcon3 from '../../icons/ItemCategoryIcon3';
import ItemExitIcon1 from '../../icons/ItemExitIcon1';
import ItemExitIcon2 from '../../icons/ItemExitIcon2';
import ItemExitIcon3 from '../../icons/ItemExitIcon3';
import ItemReviewIcon1 from '../../icons/ItemReviewIcon1';
import ItemReviewIcon2 from '../../icons/ItemReviewIcon2';
import ItemReviewIcon3 from '../../icons/ItemReviewIcon3';
import Header from '../Header';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          body_count:'',
          clickedArrow:true,
          isDivWide: false,
          isArrowWide: false,
          isMenuWide: false,
          isBodyWide: false,
          hoveredIndex: null,
          clickedIndex: null,
          isCount:null,
          isDivSize:null,
        };
      }
    componentDidMount() {
      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get('email');
      const body_count = queryParams.get('body_count');
      this.setState({ email, body_count });
    }
    handleShowArrow=()=>
    {
      this.setState((prevState) => ({
        clickedArrow: !prevState.clickedArrow,
      }));
      this.setState((prevState) => ({
        isDivWide: !prevState.isDivWide,
      }));
      this.setState((prevState) => ({
        isArrowWide: !prevState.isArrowWide,
      }));
      this.setState((prevState) => ({
        isMenuWide: !prevState.isMenuWide,
      }));
      this.setState((prevState) => ({
        isBodyWide: !prevState.isBodyWide,
      }));
      this.setState((prevState) => ({
        isDivSize: !prevState.isDivSize,
      }));
    }

    handleClick = (index) => {
      this.setState({
        clickedIndex: index,
        isCount:index,
      });
    };
    handleMouseEnter = (index) => {
      this.setState({
        hoveredIndex: index,
      });
    };
  
    handleMouseLeave = () => {
      this.setState({
        hoveredIndex: null,
      });
    };

  render()
  {
    const { email } = this.state;
    const { clickedArrow } = this.state;
    const { isDivWide } = this.state;
    const { isArrowWide } = this.state;
    const { isMenuWide } = this.state;
    const { isBodyWide } = this.state;

    const divStyle = {
      width: isDivWide ? '140px' : '339px',
    };
    const arrowStyle = {
      marginLeft: isArrowWide ? '-87px' : '110px',
    };
    const menuStyle = {
      width: isMenuWide ? '107px' : '326px',
    };
    const bodyStyle = {
      width: isBodyWide ? '1379px' : '1160px',
      marginLeft:isBodyWide?'98px':'317px',
    };

    const { hoveredIndex, clickedIndex,isCount } = this.state;
    const divSize =isArrowWide ? '239px' : '20px';
    return (

      <div className='admin-body'>
        <div>
          <Header/>
        </div>
        <div className='left-menu'style={menuStyle} >
          <div className='menu-item-user'style={divStyle}>
            <div className='menu-img-icon'></div>
            <div className='menu-labels'>
              <label className='menu-name'>Admin admin</label>
              <label className='menu-email'>{email}</label>
            </div>
            <label className='menu-arrow-icon' style={arrowStyle}
              onClick={this.handleShowArrow}>
                {clickedArrow ? <ArrowIcon2 /> : <ArrowIcon />}
            </label>
          </div>
          <div className='left-menu-items' >
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 0 ? 'hovered' : ''}
                onClick={() => this.handleClick(0)}
                onMouseEnter={() => this.handleMouseEnter(0)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 0 ? <ItemMenuIcon3 /> : (hoveredIndex === 0 ? <ItemMenuIcon2 /> : <ItemMenuIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 1 ? 'hovered' : ''}
                onClick={() => this.handleClick(1)}
                onMouseEnter={() => this.handleMouseEnter(1)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 1 ? <ItemSalesIcon3 /> : (hoveredIndex === 1 ? <ItemSalesIcon2 /> : <ItemSalesIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 2 ? 'hovered' : ''}
                onClick={() => this.handleClick(2)}
                onMouseEnter={() => this.handleMouseEnter(2)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 2 ? <ItemOrderIcon3 /> : (hoveredIndex === 2 ? <ItemOrderIcon2 /> : <ItemOrderIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 3 ? 'hovered' : ''}
                onClick={() => this.handleClick(3)}
                onMouseEnter={() => this.handleMouseEnter(3)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 3 ? <ItemUserIcon3 /> : (hoveredIndex === 3 ? <ItemUserIcon2 /> : <ItemUserIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 4 ? 'hovered' : ''}
                onClick={() => this.handleClick(4)}
                onMouseEnter={() => this.handleMouseEnter(4)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 4 ? <ItemMessageIcon3 /> : (hoveredIndex === 4 ? <ItemMessageIcon2 /> : <ItemMessageIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 5 ? 'hovered' : ''}
                onClick={() => this.handleClick(5)}
                onMouseEnter={() => this.handleMouseEnter(5)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 5 ? <ItemProductIcon3 /> : (hoveredIndex === 5 ? <ItemProductIcon2 /> : <ItemProductIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 6 ? 'hovered' : ''}
                onClick={() => this.handleClick(6)}
                onMouseEnter={() => this.handleMouseEnter(6)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 6 ? <ItemCategoryIcon3 /> : (hoveredIndex === 6 ? <ItemCategoryIcon2 /> : <ItemCategoryIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 8 ? 'hovered' : ''}
                onClick={() => this.handleClick(8)}
                onMouseEnter={() => this.handleMouseEnter(8)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 8 ? <ItemReviewIcon3 /> : (hoveredIndex === 8  ? <ItemReviewIcon2 /> : <ItemReviewIcon1 />)}
              </li>
            </div>
            <div className='menu-item-main'>
              <div className='item-main'></div>
              <li
                className={hoveredIndex === 7 ? 'hovered' : ''}
                onClick={() => this.handleClick(7)}
                onMouseEnter={() => this.handleMouseEnter(7)}
                onMouseLeave={this.handleMouseLeave}>
                  {clickedIndex === 7 ? <ItemExitIcon3 /> : (hoveredIndex === 7 ? <ItemExitIcon2 /> : <ItemExitIcon1 />)}
              </li>
            </div>


          </div>
        </div>
        <div className='body-by-item' style={bodyStyle}>
          {isCount===0 &&<ItemMain  size={divSize}/>}
          {isCount===1 &&<ItemSales  size={divSize}/>}
          {isCount===2 &&<ItemOrder  size={divSize}/>}
          {isCount===3 &&<ItemUser  size={divSize}/>}
          {isCount===4 &&<ItemMessage  size={divSize}/>}
          {isCount===5 &&<ItemProduct  size={divSize}/>}
          {isCount===6 &&<ItemCategory  size={divSize}/>}
          {isCount===7 &&<ItemExit  size={divSize}/>}
          {isCount===8 &&<ItemReview  size={divSize}/>}
          {isCount !== 0 && isCount !== 1 &&isCount !== 2 &&isCount !== 3 &&isCount !== 4 &&isCount !== 5 &&isCount !== 6 &&isCount !== 7&&isCount !== 8 && <ItemMain size={divSize}/>}

          
        </div>
        
      </div>
    );

  }
}

export default Main;