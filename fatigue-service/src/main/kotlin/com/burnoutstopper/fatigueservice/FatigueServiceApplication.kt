package com.burnoutstopper.fatigueservice

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.security.SecurityScheme
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@OpenAPIDefinition(
        servers = [
            Server(url = "/", description = "Default Server URL"),
        ]
)
@SecurityScheme(
        name = "Authorization",
        scheme = "bearer",
        description = "Enter only the token, without the word \"Bearer\"",
        type = SecuritySchemeType.HTTP,
        `in` = SecuritySchemeIn.HEADER,
)
class FatigueServiceApplication

fun main(args: Array<String>) {
    runApplication<FatigueServiceApplication>(*args)
}
