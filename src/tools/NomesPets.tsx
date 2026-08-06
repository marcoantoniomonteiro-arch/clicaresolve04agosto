import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Dices } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface NameEntry {
  name: string;
  emoji: string;
}

const NAMES_DB: Record<string, Record<string, Record<string, NameEntry[]>>> = {
  cao: {
    preto: {
      nerd: [
        { name: "Batman", emoji: "🦇" },
        { name: "Shadow", emoji: "🌑" },
        { name: "Vader", emoji: "⚫" },
        { name: "Gandalf", emoji: "🧙" },
        { name: "Loki", emoji: "🗡️" },
        { name: "Neo", emoji: "🕶️" },
        { name: "Severus", emoji: "🧪" },
        { name: "Darth", emoji: "🌑" },
        { name: "Bruce", emoji: "🦇" },
        { name: "Pantera", emoji: "🐆" },
      ],
      classico: [
        { name: "Nego", emoji: "🖤" },
        { name: "Pretinho", emoji: "🐕" },
        { name: "Noir", emoji: "🇫🇷" },
        { name: "Onix", emoji: "💎" },
        { name: "Sombra", emoji: "🌑" },
        { name: "Trovao", emoji: "⚡" },
        { name: "Midnight", emoji: "🌙" },
        { name: "Carbono", emoji: "⚫" },
        { name: "Max", emoji: "🐕" },
        { name: "Toto", emoji: "🐾" },
      ],
      engracado: [
        { name: "Pretinho Básico", emoji: "👤" },
        { name: "Batcaverna", emoji: "🦇" },
        { name: "Foguinho", emoji: "🔥" },
        { name: "Baguncinha", emoji: "😜" },
        { name: "Puff", emoji: "💨" },
        { name: "Ninjinha", emoji: "🥷" },
        { name: "Sushi", emoji: "🍣" },
        { name: "Trouxa", emoji: "😂" },
        { name: "Perna", emoji: "🦵" },
        { name: "Foguinho", emoji: "🔥" },
      ],
      comida: [
        { name: "Cafe", emoji: "☕" },
        { name: "Pretzel", emoji: "🥨" },
        { name: "Ameixa", emoji: "🍇" },
        { name: "Uva", emoji: "🍇" },
        { name: "Biscoito", emoji: "🍪" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Pimenta", emoji: "🌶️" },
        { name: "Azeitona", emoji: "🫒" },
        { name: "Tofu", emoji: "🧊" },
        { name: "Nori", emoji: "🍣" },
      ],
      famosos: [
        { name: "Obama", emoji: "🇺🇸" },
        { name: "Pelé", emoji: "⚽" },
        { name: "Tiririca", emoji: "🤡" },
        { name: "Neymar", emoji: "⚽" },
        { name: "Drake", emoji: "🎤" },
        { name: "Messi", emoji: "⚽" },
        { name: "Ronaldo", emoji: "⚽" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Milton", emoji: "🎵" },
        { name: "Cazuza", emoji: "🎸" },
      ],
    },
    branco: {
      nerd: [
        { name: "Yoda", emoji: "👽" },
        { name: "Frodo", emoji: "🧝" },
        { name: "Gandalf", emoji: "🧙" },
        { name: "Obiwan", emoji: "⚔️" },
        { name: "Legolas", emoji: "🏹" },
        { name: "Arwen", emoji: "🧝‍♀️" },
        { name: "Elric", emoji: "⚔️" },
        { name: "Elsa", emoji: "❄️" },
        { name: "Daenerys", emoji: "🐉" },
        { name: "Aslan", emoji: "🦁" },
      ],
      classico: [
        { name: "Snow", emoji: "❄️" },
        { name: "Neve", emoji: "🌨️" },
        { name: "Algodão", emoji: "☁️" },
        { name: "Pérola", emoji: "⚪" },
        { name: "Branquinho", emoji: "🐕" },
        { name: "Marfim", emoji: "🦷" },
        { name: "Nuvem", emoji: "☁️" },
        { name: "Cristal", emoji: "💎" },
        { name: "Bola", emoji: "⚪" },
        { name: "Lili", emoji: "🌸" },
      ],
      engracado: [
        { name: "Pipoca", emoji: "🍿" },
        { name: "Marshmallow", emoji: "🍬" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Limpinho", emoji: "🧼" },
        { name: "Sabotagem", emoji: "😂" },
        { name: "Bolinha", emoji: "⚪" },
        { name: "Fofura", emoji: "🥰" },
        { name: "Branquelas", emoji: "😂" },
        { name: "Sabonete", emoji: "🧼" },
        { name: "Coco", emoji: "🥥" },
      ],
      comida: [
        { name: "Marshmallow", emoji: "🍬" },
        { name: "Arroz", emoji: "🍚" },
        { name: "Leite", emoji: "🥛" },
        { name: "Tapioca", emoji: "🫓" },
        { name: "Queijo", emoji: "🧀" },
        { name: "Pipoca", emoji: "🍿" },
        { name: "Requeijão", emoji: "🥣" },
        { name: "Bolo", emoji: "🎂" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Iogurte", emoji: "🥛" },
      ],
      famosos: [
        { name: "Gandalf", emoji: "🧙" },
        { name: "Snoop", emoji: "🎤" },
        { name: "Elvis", emoji: "🕺" },
        { name: "Madonna", emoji: "🎤" },
        { name: "Branco", emoji: "😂" },
        { name: "Xuxa", emoji: "🎵" },
        { name: "Ivete", emoji: "🎤" },
        { name: "Gretchen", emoji: "💃" },
        { name: "Lady Gaga", emoji: "👗" },
        { name: "Madonna", emoji: "🎤" },
      ],
    },
    caramelo: {
      nerd: [
        { name: "Chewbacca", emoji: "🐻" },
        { name: "Simba", emoji: "🦁" },
        { name: "Wolverine", emoji: "🦡" },
        { name: "Flash", emoji: "⚡" },
        { name: "Groot", emoji: "🌳" },
        { name: "Han Solo", emoji: "🚀" },
        { name: "Rocket", emoji: "🦝" },
        { name: "Mufasa", emoji: "🦁" },
        { name: "Pikachu", emoji: "⚡" },
        { name: "Charmander", emoji: "🔥" },
      ],
      classico: [
        { name: "Mel", emoji: "🍯" },
        { name: "Caramelo", emoji: "🍮" },
        { name: "Dourado", emoji: "🏆" },
        { name: "Melão", emoji: "🍈" },
        { name: "Touro", emoji: "🐂" },
        { name: "Marrom", emoji: "🐕" },
        { name: "Canela", emoji: "🪵" },
        { name: "Açafrão", emoji: "🌾" },
        { name: "Cobrão", emoji: "🐍" },
        { name: "Tigrão", emoji: "🐅" },
      ],
      engracado: [
        { name: "Amendoim", emoji: "🥜" },
        { name: "Paçoca", emoji: "🍪" },
        { name: "Pamonha", emoji: "🌽" },
        { name: "Caramelo", emoji: "🍬" },
        { name: "Fofão", emoji: "😂" },
        { name: "Grilinho", emoji: "🦗" },
        { name: "Pitoco", emoji: "😂" },
        { name: "Tobias", emoji: "😂" },
        { name: "Gordinho", emoji: "🍔" },
        { name: "Perna", emoji: "🦵" },
      ],
      comida: [
        { name: "Paçoca", emoji: "🍪" },
        { name: "Caramelo", emoji: "🍬" },
        { name: "Amendoim", emoji: "🥜" },
        { name: "Doce", emoji: "🍭" },
        { name: "Manteiga", emoji: "🧈" },
        { name: "Caju", emoji: "🥜" },
        { name: "Mel", emoji: "🍯" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Pamonha", emoji: "🌽" },
        { name: "Mandioca", emoji: "🍠" },
      ],
      famosos: [
        { name: "Simba", emoji: "🦁" },
        { name: "Pelé", emoji: "⚽" },
        { name: "Neymar", emoji: "⚽" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Caetano", emoji: "🎵" },
        { name: "Gil", emoji: "🎵" },
        { name: "Milton", emoji: "🎵" },
        { name: "Chico", emoji: "🎵" },
        { name: "Roberto", emoji: "🎵" },
        { name: "Domingão", emoji: "📺" },
      ],
    },
    rajado: {
      nerd: [
        { name: "Tigrão", emoji: "🐅" },
        { name: "Rajado", emoji: "🐆" },
        { name: "Shenzi", emoji: "🦓" },
        { name: "Zazu", emoji: "🦜" },
        { name: "Tigresa", emoji: "🐯" },
        { name: "Jafar", emoji: "🐍" },
        { name: "Hades", emoji: "🔥" },
        { name: "Fera", emoji: "🦁" },
        { name: "Shere Khan", emoji: "🐅" },
        { name: "Bagheera", emoji: "🐆" },
      ],
      classico: [
        { name: "Rajado", emoji: "🐅" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Listrado", emoji: "🦓" },
        { name: "Zebra", emoji: "🦓" },
        { name: "Pintado", emoji: "🐆" },
        { name: "Tigre", emoji: "🐅" },
        { name: "Onça", emoji: "🐆" },
        { name: "Leopardo", emoji: "🐆" },
        { name: "Jaguar", emoji: "🐆" },
        { name: "Pintado", emoji: "🐆" },
      ],
      engracado: [
        { name: "Listras", emoji: "🦓" },
        { name: "Biscoitinho", emoji: "🍪" },
        { name: "Pão de Queijo", emoji: "🧀" },
        { name: "Frauda", emoji: "😂" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Zigzag", emoji: "⚡" },
        { name: "Pintinhas", emoji: "😂" },
        { name: "Bolinhas", emoji: "⚪" },
        { name: "Frauda", emoji: "😂" },
        { name: "Chicletes", emoji: "🍬" },
      ],
      comida: [
        { name: "Biscoito", emoji: "🍪" },
        { name: "Paçoca", emoji: "🍪" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Coxinha", emoji: "🍗" },
        { name: "Pão", emoji: "🍞" },
        { name: "Waffle", emoji: "🧇" },
        { name: "Pizza", emoji: "🍕" },
        { name: "Churros", emoji: "🥨" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Muffin", emoji: "🧁" },
      ],
      famosos: [
        { name: "Tigrão", emoji: "🐅" },
        { name: "Pelé", emoji: "⚽" },
        { name: "Garrincha", emoji: "⚽" },
        { name: "Ronaldinho", emoji: "⚽" },
        { name: "Romário", emoji: "⚽" },
        { name: "Bebeto", emoji: "⚽" },
        { name: "Taffarel", emoji: "🧤" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Tufão", emoji: "🌪️" },
      ],
    },
    marrom: {
      nerd: [
        { name: "Wookiee", emoji: "🐻" },
        { name: "Ewok", emoji: "🧸" },
        { name: "Ted", emoji: "🧸" },
        { name: "Groot", emoji: "🌳" },
        { name: "Hagrid", emoji: "🧔" },
        { name: "Chewie", emoji: "🐻" },
        { name: "Baloo", emoji: "🐻" },
        { name: "Winnie", emoji: "🍯" },
        { name: "Pooh", emoji: "🍯" },
        { name: "Paddington", emoji: "🧸" },
      ],
      classico: [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Café", emoji: "☕" },
        { name: "Marrom", emoji: "🐕" },
        { name: "Terra", emoji: "🌍" },
        { name: "Barro", emoji: "🏗️" },
        { name: "Castanho", emoji: "🌰" },
        { name: "Noz", emoji: "🥜" },
        { name: "Semente", emoji: "🌱" },
        { name: "Tronco", emoji: "🪵" },
        { name: "Raiz", emoji: "🌱" },
      ],
      engracado: [
        { name: "Café", emoji: "☕" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Frauda", emoji: "😂" },
        { name: "Muffin", emoji: "🧁" },
        { name: "Brownie", emoji: "🍫" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Pé", emoji: "🦶" },
        { name: "Nariz", emoji: "👃" },
      ],
      comida: [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Café", emoji: "☕" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Brownie", emoji: "🍫" },
        { name: "Muffin", emoji: "🧁" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Churros", emoji: "🥨" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Mousse", emoji: "🍮" },
      ],
      famosos: [
        { name: "Pelé", emoji: "⚽" },
        { name: "Neymar", emoji: "⚽" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Caetano", emoji: "🎵" },
        { name: "Gil", emoji: "🎵" },
        { name: "Milton", emoji: "🎵" },
        { name: "Chico", emoji: "🎵" },
        { name: "Roberto", emoji: "🎵" },
        { name: "Domingão", emoji: "📺" },
        { name: "Sílvio", emoji: "📺" },
      ],
    },
  },
  gato: {
    preto: {
      nerd: [
        { name: "Salem", emoji: "🐈‍⬛" },
        { name: "Luna", emoji: "🌙" },
        { name: "Binx", emoji: "🐈‍⬛" },
        { name: "Toothless", emoji: "🐉" },
        { name: "Batman", emoji: "🦇" },
        { name: "Severus", emoji: "🧪" },
        { name: "Voldemort", emoji: "🐍" },
        { name: "Jiji", emoji: "🐈‍⬛" },
        { name: "Pantera", emoji: "🐆" },
        { name: "Bagheera", emoji: "🐆" },
      ],
      classico: [
        { name: "Noir", emoji: "🇫🇷" },
        { name: "Sombra", emoji: "🌑" },
        { name: "Pretinho", emoji: "🐈‍⬛" },
        { name: "Midnight", emoji: "🌙" },
        { name: "Onix", emoji: "💎" },
        { name: "Trovão", emoji: "⚡" },
        { name: "Ninja", emoji: "🥷" },
        { name: "Salem", emoji: "🐈‍⬛" },
        { name: "Bagheera", emoji: "🐆" },
        { name: "Pantera", emoji: "🐆" },
      ],
      engracado: [
        { name: "Pretinho", emoji: "🐈‍⬛" },
        { name: "Sombra", emoji: "🌑" },
        { name: "Ninja", emoji: "🥷" },
        { name: "Bagunça", emoji: "😂" },
        { name: "Batatinha", emoji: "🥔" },
        { name: "Foguinho", emoji: "🔥" },
        { name: "Bagunça", emoji: "😂" },
        { name: "Preguiça", emoji: "🦥" },
        { name: "Dengoso", emoji: "😽" },
        { name: "Folgado", emoji: "😺" },
      ],
      comida: [
        { name: "Café", emoji: "☕" },
        { name: "Pretzel", emoji: "🥨" },
        { name: "Ameixa", emoji: "🍇" },
        { name: "Uva", emoji: "🍇" },
        { name: "Biscoito", emoji: "🍪" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Pimenta", emoji: "🌶️" },
        { name: "Azeitona", emoji: "🫒" },
        { name: "Tofu", emoji: "🧊" },
        { name: "Nori", emoji: "🍣" },
      ],
      famosos: [
        { name: "Salem", emoji: "🐈‍⬛" },
        { name: "Binx", emoji: "🐈‍⬛" },
        { name: "Jiji", emoji: "🐈‍⬛" },
        { name: "Toothless", emoji: "🐉" },
        { name: "Bagheera", emoji: "🐆" },
        { name: "Pantera", emoji: "🐆" },
        { name: "Salem", emoji: "🐈‍⬛" },
        { name: "Binx", emoji: "🐈‍⬛" },
        { name: "Jiji", emoji: "🐈‍⬛" },
        { name: "Toothless", emoji: "🐉" },
      ],
    },
    branco: {
      nerd: [
        { name: "Yuki", emoji: "❄️" },
        { name: "Artemis", emoji: "🌙" },
        { name: "Frodo", emoji: "🧝" },
        { name: "Gandalf", emoji: "🧙" },
        { name: "Obiwan", emoji: "⚔️" },
        { name: "Legolas", emoji: "🏹" },
        { name: "Arwen", emoji: "🧝‍♀️" },
        { name: "Elric", emoji: "⚔️" },
        { name: "Elsa", emoji: "❄️" },
        { name: "Daenerys", emoji: "🐉" },
      ],
      classico: [
        { name: "Snow", emoji: "❄️" },
        { name: "Neve", emoji: "🌨️" },
        { name: "Algodão", emoji: "☁️" },
        { name: "Pérola", emoji: "⚪" },
        { name: "Branquinho", emoji: "🐈" },
        { name: "Marfim", emoji: "🦷" },
        { name: "Nuvem", emoji: "☁️" },
        { name: "Cristal", emoji: "💎" },
        { name: "Bola", emoji: "⚪" },
        { name: "Lili", emoji: "🌸" },
      ],
      engracado: [
        { name: "Pipoca", emoji: "🍿" },
        { name: "Marshmallow", emoji: "🍬" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Limpinho", emoji: "🧼" },
        { name: "Sabotagem", emoji: "😂" },
        { name: "Bolinha", emoji: "⚪" },
        { name: "Fofura", emoji: "🥰" },
        { name: "Branquelas", emoji: "😂" },
        { name: "Sabonete", emoji: "🧼" },
        { name: "Coco", emoji: "🥥" },
      ],
      comida: [
        { name: "Marshmallow", emoji: "🍬" },
        { name: "Arroz", emoji: "🍚" },
        { name: "Leite", emoji: "🥛" },
        { name: "Tapioca", emoji: "🫓" },
        { name: "Queijo", emoji: "🧀" },
        { name: "Pipoca", emoji: "🍿" },
        { name: "Requeijão", emoji: "🥣" },
        { name: "Bolo", emoji: "🎂" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Iogurte", emoji: "🥛" },
      ],
      famosos: [
        { name: "Gandalf", emoji: "🧙" },
        { name: "Snoop", emoji: "🎤" },
        { name: "Elvis", emoji: "🕺" },
        { name: "Madonna", emoji: "🎤" },
        { name: "Branco", emoji: "😂" },
        { name: "Xuxa", emoji: "🎵" },
        { name: "Ivete", emoji: "🎤" },
        { name: "Gretchen", emoji: "💃" },
        { name: "Lady Gaga", emoji: "👗" },
        { name: "Madonna", emoji: "🎤" },
      ],
    },
    caramelo: {
      nerd: [
        { name: "Simba", emoji: "🦁" },
        { name: "Chewbacca", emoji: "🐻" },
        { name: "Wolverine", emoji: "🦡" },
        { name: "Flash", emoji: "⚡" },
        { name: "Groot", emoji: "🌳" },
        { name: "Han Solo", emoji: "🚀" },
        { name: "Rocket", emoji: "🦝" },
        { name: "Mufasa", emoji: "🦁" },
        { name: "Pikachu", emoji: "⚡" },
        { name: "Charmander", emoji: "🔥" },
      ],
      classico: [
        { name: "Mel", emoji: "🍯" },
        { name: "Caramelo", emoji: "🍮" },
        { name: "Dourado", emoji: "🏆" },
        { name: "Melão", emoji: "🍈" },
        { name: "Touro", emoji: "🐂" },
        { name: "Marrom", emoji: "🐈" },
        { name: "Canela", emoji: "🪵" },
        { name: "Açafrão", emoji: "🌾" },
        { name: "Cobrão", emoji: "🐍" },
        { name: "Tigrão", emoji: "🐅" },
      ],
      engracado: [
        { name: "Amendoim", emoji: "🥜" },
        { name: "Paçoca", emoji: "🍪" },
        { name: "Pamonha", emoji: "🌽" },
        { name: "Caramelo", emoji: "🍬" },
        { name: "Fofão", emoji: "😂" },
        { name: "Grilinho", emoji: "🦗" },
        { name: "Pitoco", emoji: "😂" },
        { name: "Tobias", emoji: "😂" },
        { name: "Gordinho", emoji: "🍔" },
        { name: "Perna", emoji: "🦵" },
      ],
      comida: [
        { name: "Paçoca", emoji: "🍪" },
        { name: "Caramelo", emoji: "🍬" },
        { name: "Amendoim", emoji: "🥜" },
        { name: "Doce", emoji: "🍭" },
        { name: "Manteiga", emoji: "🧈" },
        { name: "Caju", emoji: "🥜" },
        { name: "Mel", emoji: "🍯" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Pamonha", emoji: "🌽" },
        { name: "Mandioca", emoji: "🍠" },
      ],
      famosos: [
        { name: "Simba", emoji: "🦁" },
        { name: "Pelé", emoji: "⚽" },
        { name: "Neymar", emoji: "⚽" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Caetano", emoji: "🎵" },
        { name: "Gil", emoji: "🎵" },
        { name: "Milton", emoji: "🎵" },
        { name: "Chico", emoji: "🎵" },
        { name: "Roberto", emoji: "🎵" },
        { name: "Domingão", emoji: "📺" },
      ],
    },
    rajado: {
      nerd: [
        { name: "Tigrão", emoji: "🐅" },
        { name: "Rajado", emoji: "🐆" },
        { name: "Shenzi", emoji: "🦓" },
        { name: "Zazu", emoji: "🦜" },
        { name: "Tigresa", emoji: "🐯" },
        { name: "Jafar", emoji: "🐍" },
        { name: "Hades", emoji: "🔥" },
        { name: "Fera", emoji: "🦁" },
        { name: "Shere Khan", emoji: "🐅" },
        { name: "Bagheera", emoji: "🐆" },
      ],
      classico: [
        { name: "Rajado", emoji: "🐅" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Listrado", emoji: "🦓" },
        { name: "Zebra", emoji: "🦓" },
        { name: "Pintado", emoji: "🐆" },
        { name: "Tigre", emoji: "🐅" },
        { name: "Onça", emoji: "🐆" },
        { name: "Leopardo", emoji: "🐆" },
        { name: "Jaguar", emoji: "🐆" },
        { name: "Pintado", emoji: "🐆" },
      ],
      engracado: [
        { name: "Listras", emoji: "🦓" },
        { name: "Biscoitinho", emoji: "🍪" },
        { name: "Pão de Queijo", emoji: "🧀" },
        { name: "Frauda", emoji: "😂" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Zigzag", emoji: "⚡" },
        { name: "Pintinhas", emoji: "😂" },
        { name: "Bolinhas", emoji: "⚪" },
        { name: "Frauda", emoji: "😂" },
        { name: "Chicletes", emoji: "🍬" },
      ],
      comida: [
        { name: "Biscoito", emoji: "🍪" },
        { name: "Paçoca", emoji: "🍪" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Coxinha", emoji: "🍗" },
        { name: "Pão", emoji: "🍞" },
        { name: "Waffle", emoji: "🧇" },
        { name: "Pizza", emoji: "🍕" },
        { name: "Churros", emoji: "🥨" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Muffin", emoji: "🧁" },
      ],
      famosos: [
        { name: "Tigrão", emoji: "🐅" },
        { name: "Pelé", emoji: "⚽" },
        { name: "Garrincha", emoji: "⚽" },
        { name: "Ronaldinho", emoji: "⚽" },
        { name: "Romário", emoji: "⚽" },
        { name: "Bebeto", emoji: "⚽" },
        { name: "Taffarel", emoji: "🧤" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Tigrão", emoji: "🐅" },
        { name: "Tufão", emoji: "🌪️" },
      ],
    },
    marrom: {
      nerd: [
        { name: "Wookiee", emoji: "🐻" },
        { name: "Ewok", emoji: "🧸" },
        { name: "Ted", emoji: "🧸" },
        { name: "Groot", emoji: "🌳" },
        { name: "Hagrid", emoji: "🧔" },
        { name: "Chewie", emoji: "🐻" },
        { name: "Baloo", emoji: "🐻" },
        { name: "Winnie", emoji: "🍯" },
        { name: "Pooh", emoji: "🍯" },
        { name: "Paddington", emoji: "🧸" },
      ],
      classico: [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Café", emoji: "☕" },
        { name: "Marrom", emoji: "🐈" },
        { name: "Terra", emoji: "🌍" },
        { name: "Barro", emoji: "🏗️" },
        { name: "Castanho", emoji: "🌰" },
        { name: "Noz", emoji: "🥜" },
        { name: "Semente", emoji: "🌱" },
        { name: "Tronco", emoji: "🪵" },
        { name: "Raiz", emoji: "🌱" },
      ],
      engracado: [
        { name: "Café", emoji: "☕" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Frauda", emoji: "😂" },
        { name: "Muffin", emoji: "🧁" },
        { name: "Brownie", emoji: "🍫" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Pé", emoji: "🦶" },
        { name: "Nariz", emoji: "👃" },
      ],
      comida: [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Brigadeiro", emoji: "🍫" },
        { name: "Café", emoji: "☕" },
        { name: "Cacau", emoji: "🍫" },
        { name: "Brownie", emoji: "🍫" },
        { name: "Muffin", emoji: "🧁" },
        { name: "Sorvete", emoji: "🍦" },
        { name: "Churros", emoji: "🥨" },
        { name: "Pudim", emoji: "🍮" },
        { name: "Mousse", emoji: "🍮" },
      ],
      famosos: [
        { name: "Pelé", emoji: "⚽" },
        { name: "Neymar", emoji: "⚽" },
        { name: "Senna", emoji: "🏎️" },
        { name: "Caetano", emoji: "🎵" },
        { name: "Gil", emoji: "🎵" },
        { name: "Milton", emoji: "🎵" },
        { name: "Chico", emoji: "🎵" },
        { name: "Roberto", emoji: "🎵" },
        { name: "Domingão", emoji: "📺" },
        { name: "Sílvio", emoji: "📺" },
      ],
    },
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function NomesPets({ onBack }: Props) {
  const [especie, setEspecie] = useState<"cao" | "gato">("cao");
  const [cor, setCor] = useState<"preto" | "branco" | "caramelo" | "rajado" | "marrom">("preto");
  const [tema, setTema] = useState<"nerd" | "classico" | "engracado" | "comida" | "famosos">("nerd");
  const [results, setResults] = useState<NameEntry[]>([]);

  function gerar() {
    const all = NAMES_DB[especie][cor][tema];
    setResults(shuffle(all).slice(0, 10));
  }

  return (
    <ToolLayout
      title="Gerador de Nomes para Pets"
      emoji="🐶"
      category="Pet"
      description="Gere nomes criativos para cães e gatos com filtros por tema e característica."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["coleira personalizada", "plaquinha de identificacao pet"]}
          label="Personalize seu pet"
          shopeeTerms={["coleira pet personalizada"]} shopeeLabel="Ver na Shopee"
        />
      }
    >
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400 mb-1 block">Espécie</span>
          <div className="flex gap-2">
            {(["cao", "gato"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEspecie(e)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  especie === e
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {e === "cao" ? "🐕 Cão" : "🐈 Gato"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 mb-1 block">Cor do pelo</span>
          <div className="flex flex-wrap gap-2">
            {([
              { v: "preto", l: "⚫ Preto" },
              { v: "branco", l: "⚪ Branco" },
              { v: "caramelo", l: "🟤 Caramelo" },
              { v: "rajado", l: "🐅 Rajado" },
              { v: "marrom", l: "🟫 Marrom" },
            ] as const).map((c) => (
              <button
                key={c.v}
                onClick={() => setCor(c.v)}
                className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all ${
                  cor === c.v
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 mb-1 block">Tema</span>
          <div className="flex flex-wrap gap-2">
            {([
              { v: "nerd", l: "🤓 Nerd/Geek" },
              { v: "classico", l: "⭐ Clássico" },
              { v: "engracado", l: "😂 Engraçado" },
              { v: "comida", l: "🍕 Comida" },
              { v: "famosos", l: "🌟 Famosos" },
            ] as const).map((t) => (
              <button
                key={t.v}
                onClick={() => setTema(t.v)}
                className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all ${
                  tema === t.v
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={gerar} className="btn-primary w-full flex items-center justify-center gap-2">
          <Dices className="w-4 h-4" />
          Gerar 10 nomes
        </button>

        {results.length > 0 && (
          <div className="space-y-2 mt-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
              Nomes sugeridos:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-sm font-semibold text-white">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Gerador de Nomes para Pets"
        category="Pet"
        data={{
          directAnswer: "O gerador de nomes para pets sugere opções criativas filtradas por tipo de animal e estilo desejado, como nomes fofos, engraçados ou únicos.",
          howItWorks: "A ferramenta sorteia sugestões de nomes de uma base organizada por categorias (fofos, engraçados, curtos, exóticos) e tipo de pet (cão, gato, outros). Isso ajuda tutores que estão em dúvida na hora de escolher o nome do novo animal de estimação, oferecendo várias opções rapidamente.",
          example: {
            title: "Exemplo: gerando nomes para um gato com estilo 'fofo'",
            steps: [
              "Tipo de pet: Gato",
              "Estilo escolhido: Fofo",
              "Sugestões geradas: Mimi, Fofinho, Luna, Bolinha, Amora",
              "Nome escolhido pelo tutor: Luna",
            ],
            result: "A ferramenta gerou 5 sugestões de nomes fofos para gatos, facilitando a escolha do tutor.",
          },
          faqs: [
            { question: "Posso gerar nomes específicos para cada tipo de pet?", answer: "Sim, é possível filtrar as sugestões por tipo de animal, como cães, gatos ou outros pets." },
            { question: "A ferramenta considera o sexo do pet?", answer: "Algumas sugestões podem ser mais associadas a nomes masculinos ou femininos, mas a maioria dos nomes sugeridos é neutra." },
            { question: "Posso gerar quantos nomes eu quiser?", answer: "Sim, é possível gerar novas listas de sugestões quantas vezes desejar até encontrar o nome ideal." },
            { question: "Os nomes sugeridos têm algum significado especial?", answer: "Alguns nomes são escolhidos por seu som ou associação cultural, mas não há garantia de significado específico para cada sugestão." },
          ],
        }}
      />
    </ToolLayout>
  );
}
