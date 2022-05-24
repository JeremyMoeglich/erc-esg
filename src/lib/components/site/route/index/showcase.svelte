<div class="outer">
	<div class="main">
		<div class="left">
			<h1>
				Ökologisch <br />
				Revolutionär
			</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ut corporis nesciunt. Ea,
				cum nostrum.
			</p>
		</div>
		<img src="/images/solar.svg" alt="Haus mit Solar" />
	</div>
</div>

<style lang="scss">
	.outer {
		overflow-x: hidden;
		width: 100vw;
	}
	.main {
		display: flex;
		justify-content: space-evenly;
		width: 120vw;
		margin-left: 20px;
	}
	.left {
		margin-top: 80px;
		& h1 {
			font-size: max(3vw, 50px);
		}
		& p {
			font-size: max(1.5vw, 20px);
		}
	}
	img {
		width: 70%;
	}
</style>
