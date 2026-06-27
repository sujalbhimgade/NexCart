package com.ecommerceapp.nexcartapp.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    // get any random 256bit encryption key using online tools
    private static final String SECRET_KEY= "2rB1ZKDPcWMM9OdHGVAz/9kop8WNNsyvj5t09lB4iBU=";

    public String extractUserEmail(String token){
            // subject is/should be email/username of user
            return extractClaim(token, Claims::getSubject);
    }

    // this will one single claim that you will pass
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }


    // If you want to generate token without any extra claims, by using user details
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    // this will generate token using extra details we are passing

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){
        return Jwts.builder().setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis())) // when the token is issued at,
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 48))  // 48 hours + 1000 miiliseconds
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact(); // compact will generate and return token

    }

    public boolean validateToken(String token, UserDetails userDetails){
        final String userEmail = extractUserEmail(token);

        // for spring security username is user email that we've set into our user model
        return (userEmail.equalsIgnoreCase(userDetails.getUsername()) && !isTokeExpired(token));

    }

    private boolean isTokeExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    // this will extract all the claims
    private Claims extractAllClaims(String token){
        // in context of jwt sign in key is secret used to digitally sign the jwt.
        // it is used to verify owner who it claims and it didn't get change

        // minium size for signinkey is 250

        return Jwts.parserBuilder().setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody(); // returns all claims
    }

    // this will generate sign in key using or secret key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);

    }

}
