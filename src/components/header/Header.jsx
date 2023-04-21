import React, { useEffect, useRef, useState } from 'react'
import classes from './header.module.css'
import logo from '../../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BiExit } from 'react-icons/bi'
import { logout } from '../../redux/feutures/AuthSlice'
import Logout from '../logoutUser/Logout'
const Header = () => {
    const links = [
        {
            path: '/home',
            dispaly: 'home'
        },
        {
            path: '/Write',
            dispaly: 'write'
        },
        {
            path: '/profile',
            dispaly: 'profile'
        },

    ]
    const { user } = useSelector((state) => state.auth)
    const { link } = useSelector((state) => state.link)


    const navigater = useNavigate()
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false);

    const [open, setOpen] = useState(false)
    const [logoutPop, setLogoutPop] = useState(false)


    const openProfile = () => {
        setOpen(!open)
    }
    useEffect(() => {

    }, [user])

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const logoutuser = () => {
        dispatch(logout())
        navigater('/login')
    }
    return (
        <header className={classes.header}   >
            <div className={classes.wrapper}>

                <div className={classes.logo}>
                    <img src={logo} />
                </div>


                <div className={showMenu ? classes.navigationa : classes.lg} onClick={toggleMenu}>

                    <ul className={showMenu ? classes.menu : classes.lgmenu}>
                        {
                            links.map((val, idx) => {
                                return (
                                    <li key={idx}>
                                        <NavLink className={navClass => navClass.isActive ? classes.active : classes.nav__item} to={val.path} >{val.dispaly}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div >

                {/*                   contact                       */}

                <div className={classes.contact}>
                    {
                        user ?
                            <div className={classes.porile}>

                                <img className={classes.profileImg} onClick={openProfile} src={`${link}/images/${user.profilePic}`} alt="" />

                                {
                                    open ?
                                        <ul className={classes.profilelink}>
                                            <li>
                                                <Link onClick={openProfile} to={'/profile'}>
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul> : null
                                }
                                <BiExit className={classes.exit} onClick={() => setLogoutPop(true)} />
                            </div>
                            :

                            <>
                                <Link className={classes.login}>
                                    <button>
                                        <Link to={'/login'} className={classes.link}>  Login</Link>
                                    </button>
                                </Link>
                                <Link className={classes.register}>
                                    <button>
                                        <Link to={'/register'} className={classes.link}>  Register</Link>
                                    </button>
                                </Link>
                            </>
                    }

                    <span className={classes.mobile_menu} >
                        <RiBarChartHorizontalLine className={classes.toggleIcon} onClick={toggleMenu} />
                    </span>

                </div>

            </div>
            {
                logoutPop ?
                    <Logout>
                        <div className={classes.logoutbox}>
                            <h5> conform logot your account</h5>
                            <div className={classes.logoutbtn}>

                                <h5 className={classes.logoutDel}
                                    onClick={logoutuser}

                                >Delete</h5>
                                <h5 className={classes.logoutChannel}
                                    onClick={() => setLogoutPop(false)}
                                >channel</h5>

                            </div>

                        </div>
                    </Logout> : null
            }
        </header>
    )
}

export default Header
