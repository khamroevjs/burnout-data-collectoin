package com.burnoutstopper.gatewayservice.serivce.respondent

import com.burnoutstopper.gatewayservice.dto.respondent.RespondentDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@Service
class RespondentServiceImpl @Autowired constructor(
        builder: WebClient.Builder,
        @Value("\${service.user.url}") private val userUrl: String,
        @Value("\${service.user.bearer}") private val userBearer: String
) : RespondentService {
    
    private val client = builder.baseUrl(userUrl).build()
    override fun create(): Mono<String> {
        return client.post()
                .uri("/api/user/new_respondent")
                .header(HttpHeaders.AUTHORIZATION, "Bearer $userBearer")
                .retrieve()
                .bodyToMono(String::class.java)
    }


    override fun getId(token: String): Mono<Int> {
        return client.get()
                .uri("/api/user/${token}")
                .header(HttpHeaders.AUTHORIZATION, "Bearer $userBearer")
                .retrieve()
                .bodyToMono(String::class.java)
                .map { it.toInt() }
    }

    override fun createAndGetId(): Mono<RespondentDTO> {
        return create().flatMap { token ->
            getId(token).map { id -> RespondentDTO(id, token) }
        }
    }
}
