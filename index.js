openedCards = [];
cardsCounter = 0;
winCounter = 0;
class MyCard extends HTMLElement {
	static get observedAttributes() {
		return [ 'value', 'id', 'opened' ];
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
        <style>
            @import "styles.css"
        </style>
        <div class="card">
            <img src="card.png" alt="Italian Trulli">
        </div>
      `;

		this.addEventListener('click', this.handleClick, true);
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (this[name] !== newVal) {
			this[name] = newVal;
		}
	}
	updateStyle(el) {
		const value = el.attributes.value;
		switch (value) {
			case '1':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_1.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '2':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_2.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '3':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_3.png" alt="Front of card">
                    </div>
                  `;
				break;
			case '4':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="card_4.png" alt="Front of card">
                    </div>
                  `;
				break;
			case 'joker':
				el.shadowRoot.innerHTML = `
                    <style>
                        @import "styles.css"
                    </style>
                    <div class="card">
                    <img src="joker.png" alt="Front of card">
                    </div>
                    `;
				break;
		}
	}

	resetStyle(el) {
		el.shadowRoot.innerHTML = `
        <style>
            @import "styles.css"
        </style>
        <div class="card">
            <img src="card.png" alt="Back of card">
        </div>
      `;
	}
	connectedCallback() {
		this.opened = this.getAttribute('opened');
		this.value = this.getAttribute('value');
		this.id = this.getAttribute('id');
	}

	handleClick = () => {
		const curr = this.getAttribute('opened');

		if (curr === 'false') {
			const newAttributes = { ...this.attributes, opened: 'true' };
			if (openedCards.indexOf(this.attributes.id) == -1) {
				openedCards.push(newAttributes);
				this.updateStyle(this);
			}
			this.setAttribute('opened', 'true');
		} else {
			for (var index = 0; index < openedCards.length; index++) {
				if (openedCards[index].id === this.attributes.id) {
					openedCards.splice(index, 1);
					this.resetStyle(this);
				}
			}
			this.setAttribute('opened', 'false');
		}
		if (openedCards.length >= 2) {
			this.compareCards();
		}
	};

	get attributes() {
		return { id: this.id, value: this.value, opened: this.opened };
	}
	set name(name) {
		this.setAttribute('name', name);
		this.render();
	}

	compareCards = () => {
		const card1 = openedCards[0];
		const card2 = openedCards[1];

		if (card1.value === card2.value) {
			this.win();
		} else {
			this.lose();
		}
		openedCards = [];
		this.setAttribute('opened', false);
	};

	win = () => {
		console.log('YEY');
		winCounter++;
		console.log(winCounter);
		if (winCounter == 4) {
            console.log("DONE");
			location.reload();
		}
	};
	lose = () => {
		console.log('try again');
		location.reload();
	};
}

customElements.define('my-card', MyCard);
