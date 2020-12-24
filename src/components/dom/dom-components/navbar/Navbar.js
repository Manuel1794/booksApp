import React from 'react'
import useWidth from '../../../custom-hooks/useWidth'
import { IconContext } from 'react-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import { useAuth } from '../../../contexts/AuthProvider'
import { Link, NavLink } from 'react-router-dom'
import { NavbarData } from './navbar-data/NavbarData'

const Navbar = () => {
    const {isMediumDevice,isPersDevice} = useWidth()
    const {logout} = useAuth()
  
    return (  
    <>
      <IconContext.Provider value={{ color: '#fff', size:25 } }>
        <div className={`laBarra bgBarra `}>
          <div className="Sidebar bgBooks">
            <div className={`mainBook`}>
              <Link to = '/'>
                <img
                  src={require('../../../assets/img/miniLogo.png')} alt='BooksApp' 
                  className={`logoBook`}
                />  
              </Link>
            </div>
            <ul className={`SidebarList`}>
              {
                NavbarData.map((item, key) => {
                  return (
                    <NavLink exact to ={item.path} activeClassName="itemLi" key={item.title}>
                      <li           
                        className={`elLi ${item.cName} `}
                      >
                        <div id="icon" 
                          className={`iconSmall`}
                        >
                          {item.icon}
                        </div> 
                        {isMediumDevice&&
                          <div id="title">
                            {item.title}
                          </div>
                        }
                      </li>
                    </NavLink>     
                  )
                })
              }
            </ul>
            <div className="logoutNavbar">
              {isPersDevice&&
                <p onClick={()=>logout()}>Salir</p>
              }
            </div>
              
          </div>
        </div>
      </IconContext.Provider>
    </>
        )
}

export default Navbar