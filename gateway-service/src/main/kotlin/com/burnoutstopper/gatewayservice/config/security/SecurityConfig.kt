package com.burnoutstopper.gatewayservice.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository

@Configuration
@EnableWebFluxSecurity
class SecurityConfig {

    @Bean
    fun apiHttpSecurity(
            http: ServerHttpSecurity,
            keyAuthenticationManager: KeyAuthenticationManager,
            keyAuthenticationConverter: KeyAuthenticationConverter
    ): SecurityWebFilterChain {
        val authenticationWebFilter = AuthenticationWebFilter(keyAuthenticationManager);
        authenticationWebFilter.setServerAuthenticationConverter(keyAuthenticationConverter)
        return http
                .httpBasic { it.disable() }
                .csrf { it.disable() }
                .formLogin { it.disable() }
                .logout { it.disable() }
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .authorizeExchange {
                    it.pathMatchers(
                            "/api/burnout/v1/results/{path}",
                            "/api/fatigue/v1/results/{path}",
                            "/api/coping/v1/results/{path}",
                            "/api/spb/v1/results/{path}",
                            "/api/gateway/v1/results/**").authenticated()
                            .anyExchange().permitAll()
                }
                .addFilterAt(authenticationWebFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build()
    }
}
