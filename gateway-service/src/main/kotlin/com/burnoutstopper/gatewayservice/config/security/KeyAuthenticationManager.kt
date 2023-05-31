package com.burnoutstopper.gatewayservice.config.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.function.Supplier


@Component
class KeyAuthenticationManager(@Value("\${access.token}") 
                               private val accessToken: String) : ReactiveAuthenticationManager {

    override fun authenticate(authentication: Authentication?): Mono<Authentication?> {
        return Mono.fromSupplier {
            if (authentication?.credentials == accessToken) {
                authentication.isAuthenticated = true
            }
            authentication
        }
    }
}
