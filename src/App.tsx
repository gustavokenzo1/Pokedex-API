import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [types, setTypes] = useState<any[]>([]);
    const [weight, setWeight] = useState(0);
    const [stats, setStats] = useState<any[]>([]);
    const [searchPokemon, setSearchPokemon] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        handlePokemon(1);
        setCurrent(1);
    }, []);

    const handleNextPokemon = async () => {
        handlePokemon(current + 1);
        setCurrent(current + 1);
    };

    const handlePreviousPokemon = async () => {
        if (current - 1 > 0) {
            handlePokemon(current - 1);
            setCurrent(current - 1);
        }
    };

    const handlePokemon = async (pokemon: any) => {
        try {
            setErrorMessage("");
            setLoading(true);
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            );
            setName(response.data.name);
            let typesArray: string[] = [];
            response.data.types.map((type: any) => {
                typesArray.push(type.type.name);
            });
            setTypes(typesArray);
            let statsArray: any[] = [];
            response.data.stats.map((stat: any) => {
                statsArray.push(stat);
            });
            setStats(statsArray);
            setWeight(response.data.weight);
            setImg(
                response.data.sprites.other["official-artwork"].front_default
            );
            setLoading(false);
        } catch (error) {
            setErrorMessage("Esse pokémon não existe!");
            setLoading(false);
        }
    };

    const handleInput = (event: any) => {
        setSearchPokemon(event.target.value);
    };

    const handleSearchPokemon = () => {
        handlePokemon(searchPokemon.toLowerCase().trim());
    };

    return (
        <div className="pokePage">
            <div className="container">
                <h1 className="title">
                    <a href="https://pokeapi.co/">Pokédex API</a>
                </h1>
                <div className="pokedex">
                    <div className="pokedexTop">
                        <span className="circle">
                            <span className="insideCircle"></span>
                        </span>
                        <span className="redCircle"></span>
                        <span className="yellowCircle"></span>
                        <span className="greenCircle"></span>
                    </div>
                    <span className="lowerLine"></span>
                    <span className="diagonalLine"></span>
                    <span className="upperLine"></span>
                    <div className="pokedexCenter">
                        <div className="display">
                            {errorMessage.length > 1 ? (
                                <div className="error">{errorMessage}</div>
                            ) : (
                                <>
                                    {loading ? (
                                        "Loading..."
                                    ) : (
                                        <>
                                            <div className="pokemonName">
                                                {" "}
                                                {name.charAt(0).toUpperCase() +
                                                    name.slice(1)}{" "}
                                            </div>
                                            <img
                                                className="pokemonImage"
                                                src={img}
                                                alt="pokemon"
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="pokedexBottom">
                        <span className="bottomCircle"></span>
                        <div className="rectangles">
                            <div className="topRectangles">
                                <span className="rectangleRed"></span>
                                <span className="rectangleBlue"></span>
                            </div>
                            <div
                                onClick={handleSearchPokemon}
                                className="rectangleGreen"
                            >
                                Search Pokémon
                            </div>
                        </div>
                        <div className="arrows">
                            <div className="verticalArrows">
                                <div className="arrowUp"></div>
                                <div className="arrowCenter"></div>
                                <div className="arrowDown"></div>
                            </div>
                            <div className="horizontalArrows">
                                <div
                                    onClick={handlePreviousPokemon}
                                    className="arrowLeft"
                                ></div>
                                <div className="arrowCenter"></div>
                                <div
                                    onClick={handleNextPokemon}
                                    className="arrowRight"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                        <input
                            onChange={handleInput}
                            value={searchPokemon}
                            type="text"
                            placeholder="Type a pokémon name"
                        />
                    </div>
                </div>
            </div>
            <div className="about">
                <div className="title">Sobre</div>
                <ul>
                    <li>
                        Nome: {name.charAt(0).toUpperCase() + name.slice(1)}
                    </li>
                    <li>
                        Tipo:{" "}
                        {types.map((type: any, key: number) => {
                            return key === types.length - 1
                                ? type
                                : type + ", ";
                        })}{" "}
                    </li>
                    <li>Peso: {weight}</li>
                    <li>Estatísticas: </li>
                    {stats.map((stat: any, key: number) => {
                        return (
                            <li key={key}>
                                {stat.stat.name}: {stat.base_stat}
                                <div className="statsBar">
                                    <div
                                        className="statsBarFill"
                                        style={{
                                            width: `${stat.base_stat}px`,
                                            backgroundColor: `${
                                                stat.stat.name === "speed"
                                                    ? "#F85888"
                                                    : stat.stat.name ===
                                                      "special-defense"
                                                    ? "green"
                                                    : stat.stat.name ===
                                                      "special-attack"
                                                    ? "#6890F0"
                                                    : stat.stat.name ===
                                                      "defense"
                                                    ? "#F8D030"
                                                    : stat.stat.name ===
                                                      "attack"
                                                    ? "#F08030"
                                                    : stat.stat.name === "hp"
                                                    ? "#FF0000"
                                                    : "#f5f5f5"
                                            }`,
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
