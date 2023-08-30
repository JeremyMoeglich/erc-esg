<div class="flex">
    <a href="https://google.com" target="_blank">
        <h2>
            Paypal
        </h2>
    </a>
    <a href="https://google.com" target="_blank">
        <h2>
            Spenden Konto
        </h2>
    </a>
    <a href="https://google.com" target="_blank">
        <h2>
            Bargeld
        </h2>
    </a>
</div>

<style>
    .flex {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex: auto;
    }
    .flex > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: solid black thin;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.249);
        width: 200px;
        flex: auto;
        transition-duration: 300ms;
        height: 100%;
    }
    .flex > *:hover {
        transform: scale(1.05);
        background-color: rgb(197, 234, 208);
    }
    h2 {
        text-align: center;
    }
</style>