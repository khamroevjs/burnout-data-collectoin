package com.burnoutstopper.gatewayservice.config.security

import org.springframework.http.HttpHeaders
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@Component
class KeyAuthenticationConverter : ServerAuthenticationConverter {
    override fun convert(exchange: ServerWebExchange): Mono<Authentication> {
        val token: String = extractTokenFromHeader(exchange)
        return Mono.justOrEmpty(KeyAuthenticationToken(token))
    }

    private fun extractTokenFromHeader(exchange: ServerWebExchange): String {
        val headerValue = exchange.request.headers.getFirst(HttpHeaders.AUTHORIZATION)
        if (headerValue == null || !headerValue.startsWith("Bearer ")) {
            return ""
        }
        return headerValue.substring(7)
    }
}
