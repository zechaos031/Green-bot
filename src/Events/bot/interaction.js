module.exports = async (client, interaction) => {

  if(interaction.isSelectMenu() ){
    switch ( interaction.id ){
      default:

        //Ne fait rien
        await interaction.deferUpdate()
    }
  }

  if(interaction.isButton()){

      switch ( interaction.id ){
        default:

          //Ne fait rien
          await interaction.deferUpdate()
      }
    }

}
