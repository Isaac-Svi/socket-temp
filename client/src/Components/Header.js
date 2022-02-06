import React from 'react';
import {Link} from "react-router-dom"

function Header() {
  return <div>
            <header>
                <div className="container-header">
                  <div className="inner-content">
                    <div className="brand">
                      <Link to="/">Draw & Guess Game</Link>
                    </div>
                  </div>
                </div>
              </header>

        </div>;
}

export default Header;