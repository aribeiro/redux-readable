import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap'

class Header extends Component {
    state = {
        isOpen: false
    }

    toggle = ()  => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/">Readable Redux</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem key="/">
                                <NavLink tag={Link} to="/">All</NavLink>
                            </NavItem>
                            {categories.map(category =>
                                <NavItem key={category.path}>
                                    <NavLink
                                        tag={Link}
                                        to={`/${category.path}`}>
                                        {category.name.replace(/\b\w/g, l => l.toUpperCase())}
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect((state) => ({
    categories: Object.values(state.categories)
}))(Header)
