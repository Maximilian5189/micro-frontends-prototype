package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	fs := http.FileServer(http.Dir("./static"))

	log.Println("server starting")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		fmt.Fprintf(w, "<div id='div2'>Hello world from component 2 (Go)!</div>")
	})

	http.Handle("/static/script.js", http.StripPrefix("/static", fs))

	log.Fatal(http.ListenAndServe(":9002", nil))
}
