package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	fs := http.FileServer(http.Dir("./static"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./script.js"))
		fmt.Fprintf(w, "<div id='div2'>Hello world from component 2 (Go)!</div>")
	})

	http.Handle("/static/script.js", http.StripPrefix("/static", fs))

	log.Fatal(http.ListenAndServe(":9002", nil))
}
