import React from 'react'

const AuthLayout = (Component) => ({ children, ...props }) =>
    <section>
        <Component {...props}>
            {children}
        </Component>
    </section>

export default AuthLayout
