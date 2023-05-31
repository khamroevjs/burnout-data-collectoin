package com.burnoutstopper.gatewayservice.serivce.results

import com.burnoutstopper.gatewayservice.dto.results.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ResultsServiceImpl @Autowired constructor(
        private val webClient: WebClient,
        @Value("\${service.uri.burnout}") private val urlBurnout: String,
        @Value("\${service.uri.fatigue}") private val urlFatigue: String,
        @Value("\${service.uri.coping}") private val urlCoping: String,
        @Value("\${service.uri.spb}") private val urlSpb: String) : ResultsService {

    val uriMap = mapOf(
            1 to "${urlBurnout}/api/burnout",
            2 to "${urlFatigue}/api/fatigue",
            3 to "${urlCoping}/api/coping",
            4 to "${urlSpb}/api/spb")

    override fun exists(quizId: Int, testIds: List<Int>, respondentId: Int?): Mono<Boolean> {

        var urlPath = "/v1/results/exists?quiz_id=${quizId}"
        if (respondentId != null) {
            urlPath += "&respondent_id=$respondentId"
        }
        val responseFlux = Flux.merge(
                testIds.map {
                    webClient.get().uri("${uriMap[it]}${urlPath}")
                            .retrieve().bodyToMono(Boolean::class.java)
                })
                .takeUntil { it == true }

        return responseFlux.any { it == true }
    }

    override fun getResults(quizId: Int, testIds: List<Int>, respondentId: Int?): Mono<ResultsByQuizDTO> {

        var urlPath = "/v1/results/by-quiz?quiz_id=${quizId}"
        if (respondentId != null) {
            urlPath += "&respondent_id=$respondentId"
        }

        val test1Mono = getResultsIfContains<ResultsBurnoutDTO>(testIds, 1, urlPath)

        val test2Mono = getResultsIfContains<ResultsFatigueDTO>(testIds, 2, urlPath)

        val test3Mono = getResultsIfContains<ResultsCopingDTO>(testIds, 3, urlPath)

        val test4Mono = getResultsIfContains<ResultsSpbDTO>(testIds, 4, urlPath)

        return Mono.zip(test1Mono, test2Mono, test3Mono, test4Mono)
                .map {
                    ResultsByQuizDTO(it.t1, it.t2, it.t3, it.t4)
                }
    }

    private inline fun <reified T> getResultsIfContains(testIds: List<Int>, id: Int, urlPath: String): Mono<List<T>> {
        if (testIds.contains(id)) {
            return webClient.get()
                    .uri("${uriMap[id]}${urlPath}")
                    .retrieve()
                    .bodyToFlux(T::class.java).collectList()
        }
        return Mono.just(listOf())
    }
}
