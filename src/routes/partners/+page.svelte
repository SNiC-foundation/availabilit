<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
    import CompanyCard from "./CompanyCard.svelte";
    import TierHeader from "./TierHeader.svelte";
    import {marked} from "marked";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  import type { Company } from "./types";


    const tiers = ['platinum','gold','silver','bronze']
    let companies: Record<string, Company[]> = {};
    const companiesWithTier = (tier:string,companyList:Company[]) => companyList.filter((company) => company.package == tier)

    async function loadCompanies() {
        try {
            const response = await fetch("https://availabilit.ia.utwente.nl/api/partner", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                console.error("Failed to load companies", response.status);
                return;
            }

            const data = await response.json() as Company[];
            companies = {
                platinum:  companiesWithTier('platinum',data),
                gold: companiesWithTier('gold',data),
                silver: companiesWithTier('silver',data),
                bronze: companiesWithTier('bronze',data),
            }
            console.log(companies)
        } catch (e) {
            console.error(e);
        }
    }

    onMount(() => {
        loadCompanies();
    });

    let admin = false
    async function loadUserProfile() {
        try {           
            const response = await fetch("https://availabilit.ia.utwente.nl/api/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const user = await response.json();
                admin = user && user.roles.map(role => role.name).includes('Admin')
            } 
        } catch(e) {
            console.error(e)
        }
    }

    onMount(async () => {
        await loadUserProfile();
        await loadCompanies();
    });
  </script>
  <Header title="Partners"/>
  <div id="partners_section" class="container flex-col p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if admin}
        <button class="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" on:click={()=>goto('/partners/create')}>
            Add Partner
        </button>
    {/if}
    {#each Object.entries(companies) as [tier, tierCompanies]}
    {#if tierCompanies.length > 0}
      <TierHeader tier={tier}/>
        <div class="flex items-center gap-4 flex-wrap justify-center">
            {#each tierCompanies as company}
                <CompanyCard company={company} admin={admin}/>
            {/each}
        </div>
        {/if}
      {/each}
  </div>
  