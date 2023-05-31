package com.burnoutstopper.gatewayservice.config.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority


class KeyAuthenticationToken(private val apiKey: String) : Authentication {
    private var authenticated = false
    override fun getAuthorities(): Collection<GrantedAuthority?>? = null

    override fun getCredentials(): Any = apiKey

    override fun getDetails(): Any? = null

    override fun getPrincipal(): Any? = null

    override fun isAuthenticated(): Boolean = authenticated

    @Throws(IllegalArgumentException::class)
    override fun setAuthenticated(isAuthenticated: Boolean) {
        authenticated = isAuthenticated
    }

    override fun getName(): String? = null
}
