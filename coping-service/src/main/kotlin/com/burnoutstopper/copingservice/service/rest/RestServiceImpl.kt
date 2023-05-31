package com.burnoutstopper.copingservice.service.rest

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class RestServiceImpl @Autowired constructor(private val restTemplate: RestTemplate) : RestService {
    @Value("\${service.user.url}")
    lateinit var userUrl: String

    @Value("\${service.user.bearer}")
    lateinit var userBearer: String

    override fun newRespondent(): String {
        val headers = HttpHeaders().apply { setBearerAuth(userBearer) }
        val requestEntity = HttpEntity<String>(null, headers)
        val response = restTemplate.postForEntity("${userUrl}/api/user/new_respondent", requestEntity, String::class.java)
        return response.body!!
    }

    override fun getRespondentId(token: String): Int {
        val headers = HttpHeaders().apply { setBearerAuth(userBearer) }
        val httpEntity = HttpEntity(null, headers)
        val response = restTemplate.exchange("${userUrl}/api/user/${token}", HttpMethod.GET, httpEntity,
                String::class.java)
        return response.body!!.toInt()
    }
}
