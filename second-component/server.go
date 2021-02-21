package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "<div>Hello world from component 2!</div><br />")
	})

	log.Fatal(http.ListenAndServe(":9002", nil))

}
